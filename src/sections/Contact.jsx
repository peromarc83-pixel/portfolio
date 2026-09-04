import { useState } from 'react'
import { Loader2, Mail, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import Button from '@/components/Button.jsx'
import SectionTitle from '@/components/SectionTitle.jsx'
import './Contact.css'

const INITIAL_FORM = { name: '', email: '', message: '', company: '' } // "company" = honeypot
const NAME_MAX_LENGTH = 200
const EMAIL_MAX_LENGTH = 254
const MESSAGE_MAX_LENGTH = 5000

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Merci d\'indiquer votre nom.'
  if (!form.email.trim()) {
    errors.email = 'Merci d\'indiquer votre e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format d\'e-mail invalide.'
  }
  if (!form.message.trim()) errors.message = 'Merci d\'indiquer un message.'
  return errors
}

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  // Horodatage d'affichage du formulaire : envoyé au serveur pour détecter les
  // soumissions trop rapides (typiques d'un bot), en complément du honeypot.
  const [startedAt, setStartedAt] = useState(() => Date.now())

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Honeypot : un bot remplit ce champ caché, un humain non
    if (form.company) return

    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('sending')
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          startedAt,
        }),
      })
      if (!response.ok) throw new Error('Échec de l\'envoi')
      setStatus('success')
      setForm(INITIAL_FORM)
      setStartedAt(Date.now())
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container contact__inner">
        <div className="contact__intro">
          <SectionTitle
            eyebrow="Contact"
            title="Donnons vie à votre projet, ensemble !"
            subtitle="Une idée, une question, un projet ? Parlons-en — je réponds sous 48h."
            id="contact-title"
          />
          <ul className="contact__socials">
            <li>
              <a href="mailto:contact@marc-dev.fr" className="contact__email">
                <Mail aria-hidden="true" size={18} />
                contact@marc-dev.fr
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/marc-pero-074580292/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social contact__social--linkedin"
              >
                <FaLinkedin aria-hidden="true" size={18} />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/peromarc83-pixel"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social contact__social--github"
              >
                <FaGithub aria-hidden="true" size={18} />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {/* Champ honeypot : masqué visuellement, ignoré des lecteurs d'écran, piège pour les bots */}
          <div className="contact__honeypot" aria-hidden="true">
            <label htmlFor="company">Société</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="contact__field">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={NAME_MAX_LENGTH}
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="contact__error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="contact__field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={EMAIL_MAX_LENGTH}
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="contact__error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={MESSAGE_MAX_LENGTH}
              autoComplete="off"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="contact__error">
                {errors.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <Loader2 aria-hidden="true" size={18} className="contact__spinner" />
            ) : (
              <Send aria-hidden="true" size={18} />
            )}
            Envoyer
          </Button>

          <p className="contact__status" role="status" aria-live="polite">
            {status === 'success' && 'Message envoyé, merci ! Je vous réponds rapidement.'}
            {status === 'error' && "Une erreur est survenue, merci de réessayer ou de m'écrire directement."}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Contact
