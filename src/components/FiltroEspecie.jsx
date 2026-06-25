export default function FiltroEspecie({ especies, especieSeleccionada, onEspecieChange }) {
  return (
    <div className="filtro-especie" role="group" aria-label="Filtro de especie">
      <span className="filter-title">Especie</span>
      <div className="filter-buttons">
        {especies.map((especie) => (
          <button
            key={especie}
            type="button"
            className={`filter-button ${especieSeleccionada === especie ? 'active' : ''}`}
            onClick={() => onEspecieChange(especie)}
          >
            {especie}
          </button>
        ))}
      </div>
    </div>
  )
}
