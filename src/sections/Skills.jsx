import SectionTitle from '@/components/SectionTitle.jsx'
import SkillsUniverse from '@/components/SkillsUniverse.jsx'
import './Skills.css'

function Skills() {
  return (
    <section id="competences" className="skills section">
      <div className="container">
        <SectionTitle
          eyebrow="Compétences"
          title="Univers de compétences"
          subtitle="Surtout du front-end React, avec des bases côté back-end, et le souci de l'accessibilité, de la performance et de la sécurité."
          id="competences-title"
        />
        <SkillsUniverse />
      </div>
    </section>
  )
}

export default Skills
