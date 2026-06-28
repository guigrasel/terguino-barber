import Input from '../Input/index.jsx'
import './ScheduleFilters.css'

function ScheduleFilters({
  date,
  onDateChange,
  onProfessionalChange,
  professionalId,
  professionals = [],
}) {
  return (
    <div className="schedule-filters">
      <Input
        label="Data da agenda"
        name="scheduleDate"
        onChange={(event) => onDateChange(event.target.value)}
        type="date"
        value={date}
      />

      <div className="schedule-filters__field">
        <label htmlFor="scheduleProfessional">Profissional</label>
        <select
          id="scheduleProfessional"
          name="scheduleProfessional"
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
    </div>
  )
}

export default ScheduleFilters
