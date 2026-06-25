import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import { api } from './api.js'

const APPOINTMENTS_RESOURCE = '/appointments'

export async function listAppointments(params = {}) {
  const response = await api.get(APPOINTMENTS_RESOURCE, { params })

  return response.data
}

export async function getAppointmentById(appointmentId) {
  const response = await api.get(`${APPOINTMENTS_RESOURCE}/${appointmentId}`)

  return response.data
}

export async function listAppointmentsByStatus(status) {
  const response = await api.get(APPOINTMENTS_RESOURCE, {
    params: { status },
  })

  return response.data
}

export async function listAppointmentsByClient(clientId, status) {
  const params = status ? { clientId, status } : { clientId }
  const response = await api.get(APPOINTMENTS_RESOURCE, { params })

  return response.data
}

export async function listAppointmentsByProfessional(professionalId, status) {
  const params = status ? { professionalId, status } : { professionalId }
  const response = await api.get(APPOINTMENTS_RESOURCE, { params })

  return response.data
}

export async function listAppointmentsByDate(date, status) {
  const params = status ? { date, status } : { date }
  const response = await api.get(APPOINTMENTS_RESOURCE, { params })

  return response.data
}

export async function listAppointmentsByProfessionalAndDate(
  professionalId,
  date,
) {
  const response = await api.get(APPOINTMENTS_RESOURCE, {
    params: { professionalId, date },
  })

  return response.data
}

export async function createAppointment(appointment) {
  const response = await api.post(APPOINTMENTS_RESOURCE, appointment)

  return response.data
}

export async function updateAppointment(appointmentId, appointment) {
  const response = await api.patch(
    `${APPOINTMENTS_RESOURCE}/${appointmentId}`,
    appointment,
  )

  return response.data
}

export async function updateAppointmentStatus(appointmentId, status) {
  return updateAppointment(appointmentId, { status })
}

export async function cancelAppointment(appointmentId) {
  return updateAppointment(appointmentId, {
    status: APPOINTMENT_STATUS.CANCELED,
    canceledAt: new Date().toISOString(),
  })
}