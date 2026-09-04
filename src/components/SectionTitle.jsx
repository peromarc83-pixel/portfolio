import './SectionTitle.css'

function SectionTitle({ eyebrow, title, subtitle, id }) {
  return (
    <div className="section-title">
      {eyebrow && <p className="section-title__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-title__title">
        {title}
      </h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
