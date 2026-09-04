import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">© {year} Marc — Développeur web.</p>
        <ul className="footer__socials" aria-label="Réseaux sociaux">
          <li>
            <a href="https://github.com/peromarc83-pixel" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub aria-hidden="true" size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/marc-pero-074580292/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin aria-hidden="true" size={20} />
            </a>
          </li>
          <li>
            <a href="mailto:contact@marc-dev.fr" aria-label="Envoyer un e-mail">
              <Mail aria-hidden="true" size={20} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
