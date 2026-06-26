import { useCallback, useEffect, useState } from 'react'
import {
  activateService,
  createService,
  deactivateService,
  listServices,
  updateService,
} from '../services/serviceService.js'

const GENERIC_ERROR_MESSAGE =
  'Não foi possível atualizar os serviços. Tente novamente.'

function sortServices(services) {
  return [...services].sort((current, next) =>
    current.name.localeCompare(next.name, 'pt-BR'),
  )
}

export function useServices() {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionId, setActionId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const clearFeedback = useCallback(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [])

  const loadServices = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await listServices()
      setServices(sortServices(data))
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadInitialServices() {
      try {
        const data = await listServices()

        if (isMounted) {
          setServices(sortServices(data))
        }
      } catch {
        if (isMounted) {
          setErrorMessage(GENERIC_ERROR_MESSAGE)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadInitialServices()

    return () => {
      isMounted = false
    }
  }, [])

  async function addService(service) {
    setIsSubmitting(true)
    clearFeedback()

    try {
      const createdService = await createService({
        ...service,
        active: true,
        createdAt: new Date().toISOString(),
      })

      setServices((currentServices) =>
        sortServices([...currentServices, createdService]),
      )
      setSuccessMessage('Serviço cadastrado com sucesso.')
      return createdService
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  async function editService(serviceId, service) {
    setIsSubmitting(true)
    clearFeedback()

    try {
      const updatedService = await updateService(serviceId, service)

      setServices((currentServices) =>
        sortServices(
          currentServices.map((currentService) =>
            currentService.id === serviceId ? updatedService : currentService,
          ),
        ),
      )
      setSuccessMessage('Serviço atualizado com sucesso.')
      return updatedService
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  async function toggleServiceStatus(service) {
    setActionId(service.id)
    clearFeedback()

    try {
      const updatedService = service.active
        ? await deactivateService(service.id)
        : await activateService(service.id)

      setServices((currentServices) =>
        sortServices(
          currentServices.map((currentService) =>
            currentService.id === service.id ? updatedService : currentService,
          ),
        ),
      )
      setSuccessMessage(
        updatedService.active
          ? 'Serviço ativado com sucesso.'
          : 'Serviço inativado com sucesso.',
      )
      return updatedService
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
      return null
    } finally {
      setActionId(null)
    }
  }

  return {
    actionId,
    addService,
    clearFeedback,
    editService,
    errorMessage,
    isLoading,
    isSubmitting,
    loadServices,
    services,
    successMessage,
    toggleServiceStatus,
  }
}
