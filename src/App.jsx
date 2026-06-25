import { useMemo, useState } from 'react'
import { mascotas } from './data/mascotas'
import FiltroEspecie from './components/FiltroEspecie'
import ListaMascotas from './components/ListaMascotas'
import './App.css'

const TODOS = 'Todos'

function App() {
  const especies = useMemo(() => {
    const lista = Array.from(new Set(mascotas.map((item) => item.especie))).sort()
    return [TODOS, ...lista]
  }, [])

  const [especieSeleccionada, setEspecieSeleccionada] = useState(TODOS)
  const [mostrarSoloUrgentes, setMostrarSoloUrgentes] = useState(false)

  const mascotasFiltradas = useMemo(
    () =>
      mascotas.filter((mascota) => {
        const coincideEspecie = especieSeleccionada === TODOS || mascota.especie === especieSeleccionada
        const coincideUrgente = !mostrarSoloUrgentes || mascota.adopcionUrgente
        return coincideEspecie && coincideUrgente
      }),
    [especieSeleccionada, mostrarSoloUrgentes],
  )

  const urgentesTotales = mascotas.filter((mascota) => mascota.adopcionUrgente).length

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

      <ListaMascotas mascotas={mascotasFiltradas} />
    </main>
  )
}

export default App
