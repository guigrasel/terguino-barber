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

export function validateService({ durationMinutes, name, price }) {
  const errors = {}
  const numericPrice = Number(price)
  const numericDuration = Number(durationMinutes)

  if (isBlank(name)) {
    errors.name = 'Informe o nome do serviço.'
  }

  if (!Number.isFinite(numericPrice)) {
    errors.price = 'Informe o preço do serviço.'
  } else if (numericPrice < 0) {
    errors.price = 'O preço não pode ser negativo.'
  }

  if (!Number.isFinite(numericDuration)) {
    errors.durationMinutes = 'Informe a duração do serviço.'
  } else if (numericDuration <= 0) {
    errors.durationMinutes = 'A duração deve ser maior que zero.'
  }

  return errors
}
