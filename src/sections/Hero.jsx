import { ArrowDown, Mail } from 'lucide-react'
import Badge from '@/components/Badge.jsx'
import Button from '@/components/Button.jsx'
import './Hero.css'

function Hero() {
  return (
    <section id="accueil" className="hero section">
      <div className="container">
        <div className="hero__panel">
          <div className="hero__inner">
            <div className="hero__text">
              <p className="hero__prompt">
                <span className="hero__prompt-dot" aria-hidden="true"></span>
                marc --role front-end-react
              </p>
              <h1 className="hero__title">
                Bonjour, je suis <span className="hero__title-accent">Marc</span>.
              </h1>
              <p className="hero__tagline">
                Développeur front-end React, je me forme avec une approche full-stack.
                Mon objectif : des interfaces claires, accessibles et performantes, du
                prototype au déploiement.
              </p>
              <div className="hero__ctas">
                <Button href="#projets" variant="primary">
                  Voir mes projets
                  <ArrowDown aria-hidden="true" size={18} />
                </Button>
                <Button href="#contact" variant="ghost">
                  Me contacter
                  <Mail aria-hidden="true" size={18} />
                </Button>
              </div>
              <ul className="hero__statline">
                <li className="hero__stat">
                  React
                  <span className="hero__stat-bar">
                    <span style={{ width: '88%' }}></span>
                  </span>
                </li>
                <li className="hero__stat">
                  Accessibilité
                  <span className="hero__stat-bar">
                    <span style={{ width: '80%' }}></span>
                  </span>
                </li>
                <li className="hero__stat">
                  Perf
                  <span className="hero__stat-bar">
                    <span style={{ width: '92%' }}></span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="hero__media">
              <div className="hero__badge-frame">
                <span className="hero__corner hero__corner--tl" aria-hidden="true"></span>
                <span className="hero__corner hero__corner--tr" aria-hidden="true"></span>
                <span className="hero__corner hero__corner--bl" aria-hidden="true"></span>
                <span className="hero__corner hero__corner--br" aria-hidden="true"></span>
                <span className="hero__float-tag hero__float-tag--react" aria-hidden="true">
                  React
                </span>
                <span className="hero__float-tag hero__float-tag--node" aria-hidden="true">
                  Node
                </span>
                <span className="hero__float-tag hero__float-tag--a11y" aria-hidden="true">
                  A11Y
                </span>
                <Badge className="hero__badge" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
