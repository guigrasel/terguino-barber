import { formatDateToDisplay } from '../../utils/date.js'
import './appointmentSumary.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

function AppointmentSummary({
  appointment,
  client,
  professional,
  selectedDate,
  service,
  timeSlot,
}) {
  const summary = {
    clientName: client?.name || appointment?.clientName,
    date: selectedDate || appointment?.date,
    endTime: timeSlot?.endTime || appointment?.endTime,
    professionalName: professional?.name || appointment?.professionalName,
    serviceName: service?.name || appointment?.serviceName,
    startTime: timeSlot?.startTime || appointment?.startTime,
    totalPrice: service?.price ?? appointment?.totalPrice,
  }

  return (
    <dl className="appointment-summary">
      <div>
        <dt>Cliente</dt>
        <dd>{summary.clientName}</dd>
      </div>
      <div>
        <dt>Profissional</dt>
        <dd>{summary.professionalName}</dd>
      </div>
      <div>
        <dt>Serviço</dt>
        <dd>{summary.serviceName}</dd>
      </div>
      <div>
        <dt>Preço</dt>
        <dd>{currencyFormatter.format(summary.totalPrice || 0)}</dd>
      </div>
      <div>
        <dt>Data</dt>
        <dd>{formatDateToDisplay(summary.date)}</dd>
      </div>
      <div>
        <dt>Horário</dt>
        <dd>
          {summary.startTime} as {summary.endTime}
        </dd>
      </div>
    </dl>
  )
}

export default AppointmentSummary