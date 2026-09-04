import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import Button from '@/components/Button.jsx'
import './ProjectShowcase.css'

// Cycle des couleurs de repère par tuile — mêmes teintes que la palette du site.
const TILE_ACCENTS = ['var(--color-accent)', 'var(--color-primary)', 'var(--color-success)']

const METRIC_LABELS = {
  performance: 'Performance',
  accessibilite: 'Accessibilité',
  seo: 'SEO',
}

function Thumb({ image, title }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <span className="project-showcase__thumb project-showcase__thumb--fallback" aria-hidden="true">
        {title.slice(0, 2).toUpperCase()}
      </span>
    )
  }
  return (
    <img
      className="project-showcase__thumb"
      src={image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}

function ProjectShowcase({ projects }) {
  const [activeId, setActiveId] = useState(projects[0]?.id)

  // Si le filtre actif fait disparaître le projet sélectionné, retombe sur le premier
  // visible — dérivé directement au rendu, pas besoin d'un effet pour resynchroniser l'état.
  const active = projects.find((project) => project.id === activeId) ?? projects[0]

  if (!active) return null

  return (
    <div className="project-showcase">
      <div className="project-showcase__rail" role="group" aria-label="Choisir un projet">
        {projects.map((project, index) => {
          const isActive = project.id === active.id
          return (
            <button
              key={project.id}
              type="button"
              className="project-showcase__tile"
              style={{ '--tile-accent': TILE_ACCENTS[index % TILE_ACCENTS.length] }}
              aria-pressed={isActive}
              onClick={() => setActiveId(project.id)}
            >
              <Thumb image={project.image} title={project.title} />
              <span className="project-showcase__tile-text">
                <span className="project-showcase__tile-name">{project.title}</span>
                <span className="project-showcase__tile-tag">{project.stack?.[0]}</span>
              </span>
            </button>
          )
        })}
      </div>

      <article className="project-showcase__panel" aria-live="polite">
        <div className="project-showcase__head">
          <div>
            <h3 className="project-showcase__title">{active.title}</h3>
            <p className="project-showcase__subtitle">{active.subtitle}</p>
          </div>

          {(active.links?.demo || active.links?.code) && (
            <div className="project-showcase__links">
              {active.links.demo && (
                <Button href={active.links.demo} variant="primary" className="project-showcase__link-btn">
                  <ExternalLink aria-hidden="true" size={16} />
                  Visiter le site
                </Button>
              )}
              {active.links.code && (
                <Button href={active.links.code} variant="ghost" className="project-showcase__link-btn">
                  <FaGithub aria-hidden="true" size={16} />
                  Code
                </Button>
              )}
            </div>
          )}
        </div>

        {active.stack?.length > 0 && (
          <ul className="project-showcase__stack">
            {active.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}

        <div className="project-showcase__media">
          <img src={active.image} alt={`Aperçu du projet ${active.title}`} loading="lazy" />
        </div>

        <div className={`project-showcase__grid ${active.metrics ? '' : 'project-showcase__grid--full'}`}>
          <ul className="project-showcase__highlights">
            {active.highlights?.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          {active.metrics && (
            <ul className="project-showcase__metrics">
              {Object.entries(active.metrics).map(([key, value]) => (
                <li key={key}>
                  <span className="project-showcase__metric-label">{METRIC_LABELS[key] ?? key}</span>
                  <span className="project-showcase__metric-value">{value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </div>
  )
}

export default ProjectShowcase
