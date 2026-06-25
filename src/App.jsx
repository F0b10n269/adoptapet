import { useMemo, useState } from 'react'
import { mascotas } from './data/mascotas'
import FiltroEspecie from './components/FiltroEspecie'
import ListaMascotas from './components/ListaMascotas'
import './App.css'

const TODOS = 'Todos'

function App() {
  const mascotasData = Array.isArray(mascotas) ? mascotas : []

  const especies = useMemo(() => {
    const lista = Array.from(new Set(mascotasData.map((item) => item?.especie || 'No especificado'))).sort()
    return [TODOS, ...lista]
  }, [mascotasData])

  const [especieSeleccionada, setEspecieSeleccionada] = useState(TODOS)
  const [mostrarSoloUrgentes, setMostrarSoloUrgentes] = useState(false)
  const [textoBusqueda, setTextoBusqueda] = useState('')

  const mascotasFiltradas = useMemo(
    () =>
      mascotasData.filter((mascota) => {
        const coincideEspecie = especieSeleccionada === TODOS || mascota?.especie === especieSeleccionada
        const coincideUrgente = !mostrarSoloUrgentes || mascota?.adopcionUrgente
        const nombreMascota = String(mascota?.nombre ?? '').toLowerCase()
        const texto = textoBusqueda.trim().toLowerCase()
        const coincideBusqueda = !texto || nombreMascota.includes(texto)
        return coincideEspecie && coincideUrgente && coincideBusqueda
      }),
    [especieSeleccionada, mostrarSoloUrgentes, textoBusqueda, mascotasData],
  )

  const urgentesTotales = mascotasData.filter((mascota) => mascota?.adopcionUrgente).length

  return (
    <main className="app-shell">
      <header className="hero-banner">
        <div>
          <p className="eyebrow">Refugio de animales</p>
          <h1>Directorio digital de mascotas en adopción</h1>
          <p className="hero-copy">
            Pantalla interactiva para la recepción. Explora los animales disponibles, filtra por especie y resalta los casos urgentes.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-value">{mascotas.length}</span>
            <span className="stat-label">Mascotas listadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{urgentesTotales}</span>
            <span className="stat-label">Urgente</span>
          </div>
        </div>
      </header>

      <section className="controls">
        <div className="search-box">
          <label htmlFor="busqueda-mascota" className="filter-title">
            Buscar por nombre
          </label>
          <input
            id="busqueda-mascota"
            type="text"
            value={textoBusqueda}
            onChange={(event) => setTextoBusqueda(event.target.value)}
            placeholder="Escribe el nombre de la mascota"
          />
        </div>

        <FiltroEspecie
          especies={especies}
          especieSeleccionada={especieSeleccionada}
          onEspecieChange={setEspecieSeleccionada}
        />

        <div className="toggle-group">
          <span className="toggle-label">Adopción urgente</span>
          <button
            type="button"
            className={`toggle-button ${mostrarSoloUrgentes ? 'active' : ''}`}
            onClick={() => setMostrarSoloUrgentes((value) => !value)}
          >
            {mostrarSoloUrgentes ? 'Solo urgentes' : 'Mostrar urgentes'}
          </button>
        </div>
      </section>

      <section className="summary">
        <p>
          Mostrando <strong>{mascotasFiltradas.length}</strong> de <strong>{mascotas.length}</strong> mascotas disponibles
        </p>
        {mostrarSoloUrgentes && (
          <p className="summary-note">Se muestran únicamente casos con adopción urgente.</p>
        )}
      </section>

      {mascotasFiltradas.length === 0 ? (
        <div className="empty-state">
          <p>No hay mascotas que coincidan.</p>
        </div>
      ) : (
        <ListaMascotas mascotas={mascotasFiltradas} />
      )}
    </main>
  )
}

export default App
