const MINUTES_PER_HOUR = 60

export function timeToMinutes(time) {
  const [hours, minutes] = String(time || '').split(':').map(Number)

  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
    return null
  }

  return hours * MINUTES_PER_HOUR + minutes
}

export function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR)
  const minutes = totalMinutes % MINUTES_PER_HOUR

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function addMinutesToTime(time, durationMinutes) {
  const startMinutes = timeToMinutes(time)

  if (startMinutes === null || !Number.isFinite(durationMinutes)) {
    return null
  }

  return minutesToTime(startMinutes + durationMinutes)
}

export function getTodayDateInputValue() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function addDaysToDateInputValue(date, amount) {
  const nextDate = new Date(`${date}T00:00:00`)
  nextDate.setDate(nextDate.getDate() + amount)
  const year = nextDate.getFullYear()
  const month = String(nextDate.getMonth() + 1).padStart(2, '0')
  const day = String(nextDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getCurrentTimeInputValue() {
  const now = new Date()

  return minutesToTime(now.getHours() * MINUTES_PER_HOUR + now.getMinutes())
}

export function isDateBeforeToday(date) {
  return date < getTodayDateInputValue()
}

export function compareDateAndTime(first, second) {
  if (first.date !== second.date) {
    return first.date.localeCompare(second.date)
  }

  return timeToMinutes(first.startTime) - timeToMinutes(second.startTime)
}

export function compareDateAndTimeDesc(first, second) {
  return compareDateAndTime(second, first)
}

export function isAppointmentBeforeNow(appointment) {
  const today = getTodayDateInputValue()

  if (appointment.date !== today) {
    return appointment.date < today
  }

  return timeToMinutes(appointment.startTime) < timeToMinutes(getCurrentTimeInputValue())
}

export function isAppointmentFuture(appointment) {
  return !isAppointmentBeforeNow(appointment)
}

export function formatDateToDisplay(date) {
  if (!date) {
    return ''
  }

  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}
