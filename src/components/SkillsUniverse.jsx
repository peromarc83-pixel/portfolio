import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { UNIVERSES } from '@/data/skills.js'
import './SkillsUniverse.css'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function adjacentId(currentId, direction) {
  const index = UNIVERSES.findIndex((u) => u.id === currentId)
  return UNIVERSES[(index + direction + UNIVERSES.length) % UNIVERSES.length].id
}

function SkillsUniverse() {
  const [activeId, setActiveId] = useState(UNIVERSES[0].id)
  const compact = useMediaQuery('(max-width: 768px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const tabRefs = useRef({})

  const active = UNIVERSES.find((u) => u.id === activeId)

  const cycle = useCallback((direction) => {
    setActiveId((currentId) => adjacentId(currentId, direction))
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      cycle(1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      cycle(-1)
    }
  }

  // Pattern ARIA "tablist" : les flèches déplacent le focus (et la sélection) entre
  // onglets, avec bouclage ; Home/End vont au premier/dernier. Roving tabindex ci-dessous.
  const handleTabKeyDown = (event) => {
    let nextId = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextId = adjacentId(activeId, 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextId = adjacentId(activeId, -1)
    } else if (event.key === 'Home') {
      nextId = UNIVERSES[0].id
    } else if (event.key === 'End') {
      nextId = UNIVERSES[UNIVERSES.length - 1].id
    } else {
      return
    }
    event.preventDefault()
    setActiveId(nextId)
    tabRefs.current[nextId]?.focus()
  }

  return (
    <div className={`su${reduce ? ' su--still' : ''}`}>
      <div className="su__panel">
      <div className="su__grid">
      {compact ? (
        <div className="su__tabs" role="tablist" aria-label="Univers de compétences">
          {UNIVERSES.map((universe) => (
            <button
              key={universe.id}
              type="button"
              role="tab"
              id={`su-tab-${universe.id}`}
              ref={(el) => {
                tabRefs.current[universe.id] = el
              }}
              aria-selected={universe.id === activeId}
              aria-controls="su-readout"
              tabIndex={universe.id === activeId ? 0 : -1}
              className={`su__tab${universe.id === activeId ? ' is-active' : ''}`}
              style={{ '--hue': universe.color }}
              onClick={() => setActiveId(universe.id)}
              onKeyDown={handleTabKeyDown}
            >
              <span className="su__tab-name">{universe.name}</span>
              <span className="su__tab-count">{universe.skills.length}</span>
            </button>
          ))}
        </div>
      ) : (
        <div
          className="su__stage"
          role="group"
          aria-label="Univers de compétences — flèches pour naviguer"
          onKeyDown={handleKeyDown}
        >
          <div className="su__row">
            {UNIVERSES.map((universe, index) => {
              const isActive = universe.id === activeId
              return (
                <Fragment key={universe.id}>
                  {index > 0 && (
                    <span
                      className="su__link"
                      aria-hidden="true"
                      style={{
                        '--hue-a': UNIVERSES[index - 1].color,
                        '--hue-b': universe.color,
                      }}
                    />
                  )}
                  <button
                    type="button"
                    className={`su__planet${isActive ? ' is-active' : ''}`}
                    style={{ '--hue': universe.color }}
                    aria-pressed={isActive}
                    aria-label={`${universe.name} — ${universe.skills.length} compétences`}
                    onClick={() => setActiveId(universe.id)}
                    onMouseEnter={() => setActiveId(universe.id)}
                    onFocus={() => setActiveId(universe.id)}
                  >
                    <span className="su__sphere" aria-hidden="true">
                      <span className="su__ball" />
                      <span className="su__icon">
                        <universe.icon />
                      </span>
                    </span>
                    <span className="su__tag">
                      {universe.name}
                      <span className="su__count">{universe.skills.length} comp.</span>
                    </span>
                  </button>
                </Fragment>
              )
            })}
          </div>
        </div>
      )}

      <aside
        className="su__readout"
        id="su-readout"
        role={compact ? 'tabpanel' : undefined}
        aria-labelledby={compact ? `su-tab-${activeId}` : undefined}
        aria-live="polite"
      >
        <p className="sr-only">
          {active.name} — {active.description} Compétences :{' '}
          {active.skills.map((skill) => skill.name).join(', ')}.
        </p>

        <div className="su__code-bar">
          <span className="su__code-dot su__code-dot--r" aria-hidden="true" />
          <span className="su__code-dot su__code-dot--y" aria-hidden="true" />
          <span className="su__code-dot su__code-dot--g" aria-hidden="true" />
          <span className="su__code-file" aria-hidden="true">
            <span className="su__code-file-dot" style={{ '--hue': active.color }} />
            {active.id}.json
          </span>
          <div className="su__nav">
            <button type="button" onClick={() => cycle(-1)} aria-label="Univers précédent">
              <ChevronLeft aria-hidden="true" size={16} />
            </button>
            <button type="button" onClick={() => cycle(1)} aria-label="Univers suivant">
              <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        <div className="su__code-body" aria-hidden="true">
          <div className="su__code-lines">
            {Array.from({ length: active.skills.length + 6 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="su__code-content">
            <div className="su__code-comment">// {active.description}</div>
            <div>
              <span className="su__p">{'{'}</span>
            </div>
            <div>
              &nbsp;&nbsp;<span className="su__k">&quot;univers&quot;</span>
              <span className="su__p">:</span> <span className="su__s">&quot;{active.name}&quot;</span>
              <span className="su__p">,</span>
            </div>
            <div>
              &nbsp;&nbsp;<span className="su__k">&quot;stack&quot;</span>
              <span className="su__p">:</span> <span className="su__p">[</span>
            </div>
            {active.skills.map((skill, index) => (
              <div key={skill.name}>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="su__s">&quot;{skill.name}&quot;</span>
                {index < active.skills.length - 1 && <span className="su__p">,</span>}
              </div>
            ))}
            <div>
              &nbsp;&nbsp;<span className="su__p">]</span>
            </div>
            <div>
              <span className="su__p">{'}'}</span>
            </div>
          </div>
        </div>
      </aside>
      </div>

      <details className="su__all">
        <summary>Toutes les compétences, d&apos;un coup d&apos;œil</summary>
        <div className="su__all-grid">
          {UNIVERSES.map((universe) => (
            <section key={universe.id} style={{ '--hue': universe.color }}>
              <h4>{universe.name}</h4>
              <ul>
                {universe.skills.map((skill) => (
                  <li key={skill.name}>
                    <skill.Icon color={skill.color} aria-hidden="true" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </details>
      </div>
    </div>
  )
}

export default SkillsUniverse
