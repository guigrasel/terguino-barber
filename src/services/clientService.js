import { api } from './api.js'

const CLIENTS_RESOURCE = '/clients'

export async function listClients(params = {}) {
  const response = await api.get(CLIENTS_RESOURCE, { params })

  return response.data
}

export async function getClientById(clientId) {
  const response = await api.get(`${CLIENTS_RESOURCE}/${clientId}`)

  return response.data
}

export async function getClientByPhone(phone) {
  const response = await api.get(CLIENTS_RESOURCE, {
    params: { phone },
  })

  return response.data[0] || null
}

export async function createClient(client) {
  const response = await api.post(CLIENTS_RESOURCE, client)

  return response.data
}

export async function updateClient(clientId, client) {
  const response = await api.patch(`${CLIENTS_RESOURCE}/${clientId}`, client)

  return response.data
}