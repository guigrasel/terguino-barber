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

export function isDateBeforeToday(date) {
  return date < getTodayDateInputValue()
}

export function formatDateToDisplay(date) {
  if (!date) {
    return ''
  }

  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}