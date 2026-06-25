export default function MascotaCard({ mascota }) {
  const { nombre, raza, edad, especie, descripcion, caracteristicas, adopcionUrgente } = mascota

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
          <dd>{edad} {edad === 1 ? 'año' : 'años'}</dd>
        </div>
      </dl>

      <ul className="caracteristicas">
        {caracteristicas.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
