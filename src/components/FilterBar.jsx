import './FilterBar.css'

function FilterBar({ filters, activeFilter, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filtrer les projets par catégorie">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className="filter-bar__btn"
          aria-pressed={activeFilter === filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
