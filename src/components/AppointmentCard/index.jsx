import AppointmentStatusBadge from '../AppointmentStatusBadge/index.jsx'
import Button from '../Button/index.jsx'
import { formatDateToDisplay } from '../../utils/date.js'
import './AppointmentCard.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

function AppointmentCard({
  appointment,
  canCancel = false,
  isCanceling = false,
  onCancel,
  variant = 'future',
}) {
  const professionalName =
    appointment.professional?.name || 'Profissional não encontrado'
  const serviceName = appointment.service?.name || 'Serviço não encontrado'
  const totalPrice = appointment.totalPrice ?? appointment.service?.price ?? 0

  return (
    <article className={`appointment-card appointment-card--${variant}`}>
      <header className="appointment-card__header">
        <div className="appointment-card__title">
          <strong>{serviceName}</strong>
          <span>{professionalName}</span>
        </div>

        <AppointmentStatusBadge status={appointment.status} />
      </header>

      <dl className="appointment-card__details">
        <div>
          <dt>Data</dt>
          <dd>{formatDateToDisplay(appointment.date)}</dd>
        </div>
        <div>
          <dt>Início</dt>
          <dd>{appointment.startTime}</dd>
        </div>
        <div>
          <dt>Fim</dt>
          <dd>{appointment.endTime}</dd>
        </div>
        <div>
          <dt>Profissional</dt>
          <dd>{professionalName}</dd>
        </div>
        <div>
          <dt>Serviço</dt>
          <dd>{serviceName}</dd>
        </div>
        <div>
          <dt>Preço</dt>
          <dd>{currencyFormatter.format(totalPrice)}</dd>
        </div>
      </dl>

      {canCancel && (
        <footer className="appointment-card__actions">
          <Button disabled={isCanceling} onClick={() => onCancel(appointment)}>
            Cancelar agendamento
          </Button>
        </footer>
      )}
    </article>
  )
}

export default AppointmentCard
