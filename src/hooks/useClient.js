import { useContext } from 'react'
import { ClientContext } from '../contexts/clientContext.js'
import {
  createClient,
  getClientByPhone,
} from '../services/clientService.js'

export function useClient() {
  const context = useContext(ClientContext)

  if (!context) {
    throw new Error('useClient deve ser usado dentro de ClientProvider.')
  }

  async function identifyClient(clientData) {
    const existingClient = await getClientByPhone(clientData.phone)
    const identifiedClient =
      existingClient ||
      (await createClient({
        ...clientData,
        createdAt: new Date().toISOString(),
      }))

    context.setClient(identifiedClient)

    return identifiedClient
  }

  return {
    ...context,
    identifyClient,
  }
}
