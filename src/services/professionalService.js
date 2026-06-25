import { api } from './api.js'

const PROFESSIONALS_RESOURCE = '/professionals'

export async function listProfessionals(params = {}) {
  const response = await api.get(PROFESSIONALS_RESOURCE, { params })

  return response.data
}

export async function listActiveProfessionals() {
  const response = await api.get(PROFESSIONALS_RESOURCE, {
    params: { active: true },
  })

  return response.data
}

export async function getProfessionalById(professionalId) {
  const response = await api.get(`${PROFESSIONALS_RESOURCE}/${professionalId}`)

  return response.data
}

export async function createProfessional(professional) {
  const response = await api.post(PROFESSIONALS_RESOURCE, professional)

  return response.data
}

export async function updateProfessional(professionalId, professional) {
  const response = await api.patch(
    `${PROFESSIONALS_RESOURCE}/${professionalId}`,
    professional,
  )

  return response.data
}

export async function activateProfessional(professionalId) {
  return updateProfessional(professionalId, { active: true })
}

export async function deactivateProfessional(professionalId) {
  return updateProfessional(professionalId, { active: false })
}