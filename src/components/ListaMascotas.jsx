import MascotaCard from './mascotaCard'

export default function ListaMascotas({ mascotas }) {
  if (!mascotas.length) {
    return (
      <div className="empty-state">
        <p>No hay mascotas para mostrar. Ajusta el filtro para ver más opciones.</p>
      </div>
    )
  }

  return (
    <section className="mascota-grid" aria-live="polite">
      {mascotas.map((mascota) => (
        <MascotaCard key={mascota.id} mascota={mascota} />
      ))}
    </section>
  )
}
