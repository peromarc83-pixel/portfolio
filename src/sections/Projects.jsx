import { useState } from 'react'
import SectionTitle from '@/components/SectionTitle.jsx'
import FilterBar from '@/components/FilterBar.jsx'
import ProjectCard from '@/components/ProjectCard.jsx'
import { projects } from '@/data/projects.js'
import './Projects.css'

const ALL = 'Tous'
const FILTERS = [ALL, ...new Set(projects.flatMap((project) => project.tags))]

function Projects() {
  const [activeFilter, setActiveFilter] = useState(ALL)

  const filteredProjects = projects.filter(
    (project) => activeFilter === ALL || project.tags.includes(activeFilter),
  )

  return (
    <section id="projets" className="projects section">
      <div className="container">
        <SectionTitle
          eyebrow="Projets"
          title="Réalisations récentes"
          subtitle="Une sélection de projets, du client réel à l'exercice pédagogique, filtrable par catégorie."
          id="projets-title"
        />

        <FilterBar filters={FILTERS} activeFilter={activeFilter} onChange={setActiveFilter} />

        <div className="projects__showcase" aria-live="polite">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
