import { APPOINTMENT_STATUS } from '../../constants/appointmentStatus.js'
import { HISTORY_STATUS_FILTER } from '../../hooks/useAppointmentHistory.js'
import Input from '../Input/index.jsx'
import './HistoryFilters.css'

const statusOptions = [
  { label: 'Todos', value: HISTORY_STATUS_FILTER.ALL },
  { label: 'Finalizados', value: APPOINTMENT_STATUS.COMPLETED },
  { label: 'Cancelados', value: APPOINTMENT_STATUS.CANCELED },
  { label: 'Agendados passados', value: HISTORY_STATUS_FILTER.PAST_SCHEDULED },
]

function HistoryFilters({
  endDate,
  onEndDateChange,
  onProfessionalChange,
  onStartDateChange,
  onStatusChange,
  professionalId,
  professionals = [],
  startDate,
  status,
}) {
  return (
    <div className="history-filters">
      <Input
        label="Data inicial"
        name="historyStartDate"
        onChange={(event) => onStartDateChange(event.target.value)}
        type="date"
        value={startDate}
      />

      <Input
        label="Data final"
        name="historyEndDate"
        onChange={(event) => onEndDateChange(event.target.value)}
        type="date"
        value={endDate}
      />

      <div className="history-filters__field">
        <label htmlFor="historyProfessional">Profissional</label>
        <select
          id="historyProfessional"
          name="historyProfessional"
          onChange={(event) => onProfessionalChange(event.target.value)}
          value={professionalId}
        >
          <option value="">Todos os profissionais</option>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id}>
              {professional.name}
            </option>
          ))}
        </select>
      </div>

      <div className="history-filters__field">
        <label htmlFor="historyStatus">Status</label>
        <select
          id="historyStatus"
          name="historyStatus"
          onChange={(event) => onStatusChange(event.target.value)}
          value={status}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default HistoryFilters
