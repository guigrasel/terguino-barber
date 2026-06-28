import { APPOINTMENT_STATUS } from '../../constants/appointmentStatus.js'
import './AppointmentStatusBadge.css'

const STATUS_LABELS = {
  [APPOINTMENT_STATUS.CANCELED]: 'Cancelado',
  [APPOINTMENT_STATUS.COMPLETED]: 'Finalizado',
  [APPOINTMENT_STATUS.SCHEDULED]: 'Agendado',
}

function AppointmentStatusBadge({ status }) {
  const label = STATUS_LABELS[status] || 'Indefinido'
  const statusClass = status || 'unknown'

  return (
    <span className={`appointment-status-badge appointment-status-badge--${statusClass}`}>
      {label}
    </span>
  )
}

export default AppointmentStatusBadge
