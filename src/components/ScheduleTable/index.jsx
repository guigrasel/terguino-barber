import { APPOINTMENT_STATUS } from '../../constants/appointmentStatus.js'
import AppointmentStatusBadge from '../AppointmentStatusBadge/index.jsx'
import './ScheduleTable.css'

function ScheduleTable({ appointments = [] }) {
  return (
    <div className="schedule-table-wrap">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Profissional</th>
            <th>Horário</th>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Status</th>
            <th>Agenda</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const isCanceled = appointment.status === APPOINTMENT_STATUS.CANCELED
            const availabilityLabel = appointment.isTimeOccupied
              ? 'Horário ocupado'
              : 'Horário liberado'

            return (
              <tr
                className={isCanceled ? 'schedule-table__row--canceled' : ''}
                key={appointment.id}
              >
                <td>
                  <div className="schedule-table__main">
                    <strong>
                      {appointment.professional?.name ||
                        'Profissional não encontrado'}
                    </strong>
                    {!appointment.professional?.active && (
                      <span>Profissional inativo</span>
                    )}
                  </div>
                </td>
                <td className="schedule-table__time">
                  {appointment.startTime} às {appointment.endTime}
                </td>
                <td>
                  <div className="schedule-table__main">
                    <strong>
                      {appointment.client?.name || 'Cliente não encontrado'}
                    </strong>
                    {appointment.client?.phone && (
                      <span>{appointment.client.phone}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="schedule-table__main">
                    <strong>
                      {appointment.service?.name || 'Serviço não encontrado'}
                    </strong>
                    {appointment.service?.durationMinutes && (
                      <span>{appointment.service.durationMinutes} min</span>
                    )}
                  </div>
                </td>
                <td>
                  <AppointmentStatusBadge status={appointment.status} />
                </td>
                <td>
                  <span
                    className={[
                      'schedule-table__availability',
                      appointment.isTimeOccupied
                        ? 'schedule-table__availability--occupied'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {availabilityLabel}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleTable
