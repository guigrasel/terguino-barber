import { getTodayDateInputValue, isDateBeforeToday } from '../../utils/date.js'
import Input from '../Input/index.jsx'

function DateSelector({ error, onChange, value }) {
  const today = getTodayDateInputValue()

  function handleChange(event) {
    const selectedDate = event.target.value

    onChange(selectedDate, isDateBeforeToday(selectedDate))
  }

  return (
    <Input
      error={error}
      helperText="Datas passadas não podem ser usadas para novos agendamentos."
      label="Data do atendimento"
      min={today}
      name="appointmentDate"
      onChange={handleChange}
      type="date"
      value={value}
    />
  )
}

export default DateSelector