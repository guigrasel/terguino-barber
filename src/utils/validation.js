export function isBlank(value) {
  return !String(value || '').trim()
}

export function isEndTimeAfterStartTime(startTime, endTime) {
  if (!startTime || !endTime) {
    return false
  }

  return endTime > startTime
}

export function validateProfessional({ name, workStart, workEnd }) {
  const errors = {}

  if (isBlank(name)) {
    errors.name = 'Informe o nome do profissional.'
  }

  if (!workStart) {
    errors.workStart = 'Informe o início do expediente.'
  }

  if (!workEnd) {
    errors.workEnd = 'Informe o final do expediente.'
  }

  if (workStart && workEnd && !isEndTimeAfterStartTime(workStart, workEnd)) {
    errors.workEnd = 'O final do expediente deve ser posterior ao início.'
  }

  return errors
}