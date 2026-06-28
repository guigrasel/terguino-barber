import { APPOINTMENT_STATUS } from '../../constants/appointmentStatus.js'
import { formatDateToDisplay } from '../../utils/date.js'
import AppointmentStatusBadge from '../AppointmentStatusBadge/index.jsx'
import './HistoryTable.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

function HistoryTable({ appointments = [] }) {
  return (
    <div className="history-table-wrap">
      <table className="history-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Cliente</th>
            <th>Profissional</th>
            <th>Serviço</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const isCanceled = appointment.status === APPOINTMENT_STATUS.CANCELED
            const totalPrice = appointment.totalPrice ?? 0

            return (
              <tr
                className={isCanceled ? 'history-table__row--canceled' : ''}
                key={appointment.id}
              >
                <td data-label="Data">
                  <div className="history-table__main">
                    <strong>{formatDateToDisplay(appointment.date)}</strong>
                    <span>
                      {appointment.startTime} às {appointment.endTime}
                    </span>
                  </div>
                </td>
                <td data-label="Cliente">
                  <div className="history-table__main">
                    <strong>
                      {appointment.client?.name || 'Cliente não encontrado'}
                    </strong>
                    {appointment.client?.phone && (
                      <span>{appointment.client.phone}</span>
                    )}
                  </div>
                </td>
                <td data-label="Profissional">
                  <div className="history-table__main">
                    <strong>
                      {appointment.professional?.name ||
                        'Profissional não encontrado'}
                    </strong>
                    {!appointment.professional?.active && (
                      <span>Profissional inativo</span>
                    )}
                  </div>
                </td>
                <td data-label="Serviço">
                  <div className="history-table__main">
                    <strong>
                      {appointment.service?.name || 'Serviço não encontrado'}
                    </strong>
                    <span>Valor registrado no agendamento</span>
                  </div>
                </td>
                <td className="history-table__price" data-label="Valor">
                  {currencyFormatter.format(totalPrice)}
                </td>
                <td data-label="Status">
                  <AppointmentStatusBadge status={appointment.status} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryTable
