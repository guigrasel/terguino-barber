import Button from '../Button/index.jsx'
import './ServiceCard.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

function ServiceCard({ isToggling = false, onEdit, onToggleStatus, service }) {
  const statusLabel = service.active ? 'Ativo' : 'Inativo'
  const toggleLabel = service.active ? 'Inativar' : 'Ativar'

  return (
    <article className="service-card">
      <div>
        <div className="service-card__title-row">
          <h2>{service.name}</h2>
          <span
            className={`service-card__status ${
              service.active
                ? 'service-card__status--active'
                : 'service-card__status--inactive'
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <p>
          {currencyFormatter.format(service.price)} · {service.durationMinutes}{' '}
          min
        </p>
      </div>

      <div className="service-card__actions">
        <Button onClick={() => onEdit(service)} type="button" variant="secondary">
          Editar
        </Button>
        <Button
          disabled={isToggling}
          onClick={() => onToggleStatus(service)}
          type="button"
          variant={service.active ? 'secondary' : 'primary'}
        >
          {isToggling ? 'Atualizando...' : toggleLabel}
        </Button>
      </div>
    </article>
  )
}

export default ServiceCard
