import { api } from './api.js'

const SERVICES_RESOURCE = '/services'

export async function listServices(params = {}) {
  const response = await api.get(SERVICES_RESOURCE, { params })

  return response.data
}

export async function listActiveServices() {
  const response = await api.get(SERVICES_RESOURCE, {
    params: { active: true },
  })

  return response.data
}

export async function getServiceById(serviceId) {
  const response = await api.get(`${SERVICES_RESOURCE}/${serviceId}`)

  return response.data
}

export async function createService(service) {
  const response = await api.post(SERVICES_RESOURCE, service)

  return response.data
}

export async function updateService(serviceId, service) {
  const response = await api.patch(`${SERVICES_RESOURCE}/${serviceId}`, service)

  return response.data
}

export async function activateService(serviceId) {
  return updateService(serviceId, { active: true })
}

export async function deactivateService(serviceId) {
  return updateService(serviceId, { active: false })
}