export function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export function isValidPhone(phone) {
  const normalizedPhone = normalizePhone(phone)

  return normalizedPhone.length >= 10 && normalizedPhone.length <= 13
}

export function formatPhone(phone) {
  const normalizedPhone = normalizePhone(phone)

  if (normalizedPhone.length === 11) {
    return normalizedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (normalizedPhone.length === 10) {
    return normalizedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return normalizedPhone
}
