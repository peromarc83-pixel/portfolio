import { Code2 } from 'lucide-react'
import './Logo.css'

/**
 * Marque du site : mini bille acier (même recette que les sphères de
 * compétences) + wordmark <MarcDev/>. `markOnly` n'affiche que la sphère,
 * pour un usage en sceau/favicon.
 */
function Logo({ className = '', markOnly = false }) {
  return (
    <span className={`logo${className ? ` ${className}` : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        <span className="logo__ball"></span>
        <span className="logo__mark-icon">
          <Code2 aria-hidden="true" />
        </span>
      </span>
      {!markOnly && (
        <span className="logo__wordmark">
          <span className="logo__bracket">&lt;</span>
          <span className="logo__name">MarcDev</span>
          <span className="logo__bracket">/</span>
          <span className="logo__bracket">&gt;</span>
        </span>
      )}
    </span>
  )
}

export default Logo
