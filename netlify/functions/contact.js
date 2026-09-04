import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Un humain met plus que ça à remplir le formulaire ; en dessous, on suspecte un bot
// qui poste dès le chargement de la page (voir "startedAt" envoyé par le client).
const MIN_FILL_TIME_MS = 1500

// Limitation de débit par IP, en complément du honeypot et du délai anti-bot.
// Compteur en mémoire : best-effort seulement (remis à zéro à chaque cold start ou
// nouvelle instance de la fonction) ; suffisant pour décourager le spam basique sur
// un petit site sans dépendre d'un store partagé (Netlify Blobs, Redis...).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 5 // requêtes par IP et par fenêtre
const requestLog = new Map() // ip -> timestamps[]

function getClientIp(request) {
  return (
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function isRateLimited(ip) {
  const now = Date.now()

  // Nettoyage best-effort pour éviter une fuite mémoire sur une instance restée chaude.
  if (requestLog.size > 500) {
    for (const [key, timestamps] of requestLog) {
      const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
      if (fresh.length === 0) requestLog.delete(key)
      else requestLog.set(key, fresh)
    }
  }

  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

function isValidPayload(body) {
  return (
    typeof body?.name === 'string' &&
    body.name.trim().length > 0 &&
    body.name.length <= 200 &&
    typeof body?.email === 'string' &&
    EMAIL_RE.test(body.email) &&
    typeof body?.message === 'string' &&
    body.message.trim().length > 0 &&
    body.message.length <= 5000
  )
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Trop de requêtes, merci de réessayer plus tard.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000),
      },
    })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Corps de requête invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Le champ honeypot ("company") ne doit jamais être présent côté serveur non plus :
  // s'il est rempli, on répond succès sans rien envoyer, pour ne pas renseigner le bot.
  if (body.company) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Même logique que le honeypot : une soumission trop rapide après l'affichage du
  // formulaire est traitée comme un faux positif silencieux, pour ne pas renseigner le bot.
  const elapsed = Date.now() - Number(body.startedAt)
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!isValidPayload(body)) {
    return new Response(JSON.stringify({ error: 'Champs invalides' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, email, message } = body

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] Nouveau message de ${name}`,
      text: `Nom : ${name}\nE-mail : ${email}\n\n${message}`,
      html: `<p><strong>Nom :</strong> ${escapeHtml(name)}</p><p><strong>E-mail :</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    })
  } catch (error) {
    console.error('Échec de l\'envoi du mail de contact', error)
    return new Response(JSON.stringify({ error: 'Échec de l\'envoi' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
