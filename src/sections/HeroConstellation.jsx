import { FaGithub } from 'react-icons/fa6'
import { Download } from 'lucide-react'
import Button from '@/components/Button.jsx'
import './HeroConstellation.css'

/**
 * Variante du Hero pour le thème « constellation » : la stack technique
 * orbite, reliée par des traces dorées, autour d'un jeton central portant
 * la signature du site. Positions calculées, pas de valeurs codées en dur
 * pour ajouter/retirer une techno (cf. TECHS ci-dessous).
 */

const IconReact = () => (
  <svg viewBox="-11 -11 22 22" aria-hidden="true">
    <circle r="2" fill="#61DAFB" />
    <g fill="none" stroke="#61DAFB" strokeWidth="1">
      <ellipse rx="10" ry="4.2" />
      <ellipse rx="10" ry="4.2" transform="rotate(60)" />
      <ellipse rx="10" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)
const IconJS = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="5" fill="#F7DF1E" />
    <text x="16" y="23" textAnchor="middle" fontWeight="700" fontSize="15" fill="#0A0A0B">
      JS
    </text>
  </svg>
)
const IconNode = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 2 28 9 28 23 16 30 4 23 4 9Z" fill="#539E43" />
    <text x="16" y="20" textAnchor="middle" fontWeight="700" fontSize="8.5" fill="#fff">
      node
    </text>
  </svg>
)
const IconExpress = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="5" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
    <text x="16" y="21" textAnchor="middle" fontWeight="700" fontSize="12" fill="#fff">
      EX
    </text>
  </svg>
)
const IconMongo = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 3c3 5 6 8 6 13 0 6-4 9-6 10-2-1-6-4-6-10 0-5 3-8 6-13z" fill="#47A248" />
    <path d="M16 6v22" stroke="#2f7d33" strokeWidth="1.2" />
  </svg>
)
const IconRedux = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="5" fill="#764ABC" />
    <text x="16" y="21" textAnchor="middle" fontWeight="700" fontSize="11" fill="#fff">
      RDX
    </text>
  </svg>
)
const IconCSS = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M6 3h20l-1.8 21L16 27 8 24 6 3z" fill="#1572B6" />
    <path d="M16 5.5v19l6.3-2 1.4-16.9z" fill="#33A9DC" />
    <text x="16" y="19" textAnchor="middle" fontWeight="700" fontSize="11" fill="#fff">
      3
    </text>
  </svg>
)
const IconHTML = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M6 3h20l-1.8 21L16 27 8 24 6 3z" fill="#E34F26" />
    <path d="M16 5.5v19l6.3-2 1.4-16.9z" fill="#EF652A" />
    <text x="16" y="19" textAnchor="middle" fontWeight="700" fontSize="11" fill="#fff">
      5
    </text>
  </svg>
)

// Reprend la stack déclarée dans src/data/skills.js (univers front + back)
const TECHS = [
  { name: 'React', Icon: IconReact },
  { name: 'JavaScript', Icon: IconJS },
  { name: 'Node.js', Icon: IconNode },
  { name: 'Express', Icon: IconExpress },
  { name: 'MongoDB', Icon: IconMongo },
  { name: 'Redux', Icon: IconRedux },
  { name: 'CSS3', Icon: IconCSS },
  { name: 'HTML5', Icon: IconHTML },
]

const RADIUS = 37 // % du conteneur

function HeroConstellation() {
  const nodes = TECHS.map((tech, index) => {
    const angle = ((-90 + index * (360 / TECHS.length)) * Math.PI) / 180
    return { ...tech, x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) }
  })

  return (
    <section id="accueil" className="hero-constellation section">
      <img
        className="hero-constellation__bg"
        src="/images/hero-circuit.webp"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-constellation__veil" aria-hidden="true"></div>

      <div className="container hero-constellation__inner">
        <div className="hero-constellation__text">
          <p className="hero-constellation__hello">Hello !</p>
          <h1 className="hero-constellation__title">Bonjour, je suis Marc.</h1>
          <p className="hero-constellation__role">Développeur front-end React</p>
          <p className="hero-constellation__tagline">
            Je me forme avec une approche full-stack. Mon objectif : des interfaces
            claires, accessibles et performantes, du prototype au déploiement.
          </p>
          <div className="hero-constellation__actions">
            <Button href="#contact" variant="primary" className="hero-constellation__cta">
              Me contacter
            </Button>
            <Button href="https://github.com/peromarc83-pixel" variant="ghost">
              <FaGithub aria-hidden="true" size={16} />
              GitHub
            </Button>
            <Button href="/cv-marc.pdf" variant="ghost">
              <Download aria-hidden="true" size={16} />
              Mon CV
            </Button>
          </div>
        </div>

        <div className="hero-constellation__orbit">
          <div className="constellation">
            <div className="constellation__ring" aria-hidden="true"></div>
            <svg className="constellation__wires" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <radialGradient id="hc-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e8c45a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e8c45a" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="30" fill="url(#hc-glow)" />
              {nodes.map((node, index) => (
                <g key={node.name}>
                  <line x1="50" y1="50" x2={node.x} y2={node.y} className="constellation__trace" />
                  <line
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    className="constellation__pulse"
                    pathLength="100"
                    style={{ animationDelay: `${index * -0.34}s` }}
                  />
                  <circle cx={node.x} cy={node.y} r="1" className="constellation__endpoint" />
                </g>
              ))}
            </svg>

            <div className="constellation__chip">
              <span>MarcDev</span>
            </div>

            {nodes.map((node) => (
              <div
                key={node.name}
                className="constellation__coin"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                title={node.name}
              >
                <div className="constellation__coin-inner">
                  <node.Icon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        className="hero-constellation__credit"
        href="https://unsplash.com/@brechtcorbeel"
        target="_blank"
        rel="noopener noreferrer"
      >
        Photo : Brecht Corbeel · Unsplash
      </a>
    </section>
  )
}

export default HeroConstellation
