import SectionTitle from '@/components/SectionTitle.jsx'
import TimelineItem from '@/components/TimelineItem.jsx'
import './Journey.css'

const STEPS = [
  {
    year: '1990 — 2021',
    title: 'Assurance & management',
    description:
      "Gestion de sinistres, conseil clientèle puis 14 ans à la direction d'une agence MATMUT : analyse du risque, tarification, encadrement d'équipe et décision sous contrainte, une expérience qui nourrit ma façon d'aborder le développement.",
    color: '#7ec2ee',
  },
  {
    year: '2025',
    title: 'Formation développeur web',
    description:
      'Reconversion complète : HTML/CSS, JavaScript, React, back-end Node/Express, et une dizaine de projets menés du cahier des charges au déploiement.',
    color: '#e2934f',
  },
  {
    year: '2026 — aujourd\'hui',
    title: 'Premier client réel',
    description:
      "Conception et livraison d'un site vitrine de bout en bout pour un client réel : identité visuelle, développement, sécurité, conformité RGPD et mise en production.",
    color: '#52d69a',
  },
]

function Journey() {
  return (
    <section id="parcours" className="journey section section--wash">
      <div className="container">
        <SectionTitle eyebrow="Parcours" title="Mon chemin jusqu'ici" id="parcours-title" />
        <div className="journey__panel">
          <ol className="journey__list">
            {STEPS.map((step, index) => (
              <TimelineItem
                key={step.title}
                version={`v${index + 1}.0.0`}
                {...step}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Journey
