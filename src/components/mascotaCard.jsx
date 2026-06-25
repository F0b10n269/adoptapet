export default function MascotaCard({ mascota }) {
  const {
    nombre = 'Mascota sin nombre',
    raza = 'Sin información',
    edad = null,
    especie = 'No especificado',
    descripcion = 'Descripción no disponible.',
    caracteristicas = [],
    adopcionUrgente = false,
  } = mascota || {}

  const edadTexto = typeof edad === 'number' ? `${edad} ${edad === 1 ? 'año' : 'años'}` : 'Edad no disponible'

  return (
    <article className={`card ${adopcionUrgente ? 'urgente' : ''}`}>
      <header className="card-header">
        <span className="chip">{especie}</span>
        <div>
          <h2>{nombre}</h2>
          {adopcionUrgente && <span className="badge">Adopción urgente</span>}
        </div>
      </header>

      <p className="descripcion">{descripcion}</p>

      <dl className="datos">
        <div>
          <dt>Raza</dt>
          <dd>{raza}</dd>
        </div>
        <div>
          <dt>Edad</dt>
          <dd>{edadTexto}</dd>
        </div>
      </dl>

      <ul className="caracteristicas">
        {Array.isArray(caracteristicas) && caracteristicas.length > 0 ? (
          caracteristicas.map((item) => (
            <li key={item}>{item}</li>
          ))
        ) : (
          <li>Sin características registradas</li>
        )}
      </ul>
    </article>
  )
}
