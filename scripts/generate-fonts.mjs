/**
 * Auto-héberge les polices du site : récupère le CSS Google Fonts, télécharge les
 * fichiers .woff2 (sous-ensembles latin + latin-ext) dans public/fonts/, et écrit
 * public/fonts/fonts.css avec des URL locales.
 *
 * But RGPD : aucune requête vers fonts.googleapis.com / fonts.gstatic.com au
 * chargement du site, donc aucune transmission d'IP visiteur à Google.
 *
 * Usage : npm run fonts   (à relancer si on change les graisses ci-dessous)
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'

const OUT_DIR = fileURLToPath(new URL('../public/fonts/', import.meta.url))

// Familles et graisses réellement utilisées dans src/styles + src/components
const FAMILIES =
  'family=Great+Vibes' +
  '&family=Inter:wght@400;500;600;700' +
  '&family=JetBrains+Mono:wght@400;600' +
  '&family=Poppins:wght@800' +
  '&family=Space+Grotesk:wght@500;600;700'

const SUBSETS = new Set(['latin', 'latin-ext'])
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const cssRes = await fetch(`https://fonts.googleapis.com/css2?${FAMILIES}&display=swap`, {
  headers: { 'User-Agent': UA },
})
if (!cssRes.ok) throw new Error(`CSS Google Fonts : ${cssRes.status}`)
const css = await cssRes.text()

await mkdir(OUT_DIR, { recursive: true })

const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)]
const downloads = new Map() // url -> filename
const rules = []

for (const [, subset, face] of blocks) {
  if (!SUBSETS.has(subset)) continue
  const family = /font-family:\s*'([^']+)'/.exec(face)[1]
  const url = /url\((https:\/\/[^)]+\.woff2)\)/.exec(face)[1]
  const file = `${slug(family)}-${url.split('/').pop()}`
  downloads.set(url, file)
  rules.push(face.trim().replace(url, `/fonts/${file}`))
}

for (const [url, file] of downloads) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  await pipeline(res.body, createWriteStream(new URL(file, `file://${OUT_DIR}`)))
  console.log('↓', file)
}

const header =
  '/* Généré par scripts/generate-fonts.mjs — ne pas éditer à la main.\n' +
  '   Polices auto-hébergées (latin + latin-ext) : aucune requête Google au runtime. */\n\n'
await writeFile(new URL('fonts.css', `file://${OUT_DIR}`), header + rules.join('\n\n') + '\n')

console.log(`\n${downloads.size} fichiers .woff2, ${rules.length} règles @font-face → public/fonts/fonts.css`)
