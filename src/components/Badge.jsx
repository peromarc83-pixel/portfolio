import { Code2 } from 'lucide-react'
import './Badge.css'

/**
 * Badge MarcDev : même dégradé bleu nuit partout (--gradient-badge).
 * Par défaut, monogramme "MD" + wordmark "MarcDev" ; en version `icon`,
 * le repère "</>" seul, pour les usages plus petits (À propos).
 * Taille pilotée via --badge-size (voir Badge.css).
 */
function Badge({ className = '', icon = false }) {
  const classes = ['badge', icon ? 'badge--icon' : '', className].filter(Boolean).join(' ')

  if (icon) {
    return (
      <div className={classes}>
        <Code2 className="badge__icon" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={classes} role="img" aria-label="Logo MarcDev">
      <span className="badge__mono" aria-hidden="true">
        <span className="badge__m">M</span>
        <span className="badge__d">D</span>
      </span>
      <span className="badge__word" aria-hidden="true">
        MarcDev
      </span>
    </div>
  )
}

export default Badge
