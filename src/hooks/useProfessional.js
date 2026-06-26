import { useCallback, useEffect, useState } from 'react'
import {
  activateProfessional,
  createProfessional,
  deactivateProfessional,
  listProfessionals,
  updateProfessional,
} from '../services/professionalService.js'

const GENERIC_ERROR_MESSAGE =
  'Não foi possível atualizar os profissionais. Tente novamente.'

function sortProfessionals(professionals) {
  return [...professionals].sort((current, next) =>
    current.name.localeCompare(next.name, 'pt-BR'),
  )
}

export function useProfessionals() {
  const [professionals, setProfessionals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionId, setActionId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const clearFeedback = useCallback(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [])

  const loadProfessionals = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await listProfessionals()
      setProfessionals(sortProfessionals(data))
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadInitialProfessionals() {
      try {
        const data = await listProfessionals()

        if (isMounted) {
          setProfessionals(sortProfessionals(data))
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

    loadInitialProfessionals()

    return () => {
      isMounted = false
    }
  }, [])

  async function addProfessional(professional) {
    setIsSubmitting(true)
    clearFeedback()

    try {
      const createdProfessional = await createProfessional({
        ...professional,
        active: true,
        createdAt: new Date().toISOString(),
      })

      setProfessionals((currentProfessionals) =>
        sortProfessionals([...currentProfessionals, createdProfessional]),
      )
      setSuccessMessage('Profissional cadastrado com sucesso.')
      return createdProfessional
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  async function editProfessional(professionalId, professional) {
    setIsSubmitting(true)
    clearFeedback()

    try {
      const updatedProfessional = await updateProfessional(
        professionalId,
        professional,
      )

      setProfessionals((currentProfessionals) =>
        sortProfessionals(
          currentProfessionals.map((currentProfessional) =>
            currentProfessional.id === professionalId
              ? updatedProfessional
              : currentProfessional,
          ),
        ),
      )
      setSuccessMessage('Profissional atualizado com sucesso.')
      return updatedProfessional
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  async function toggleProfessionalStatus(professional) {
    setActionId(professional.id)
    clearFeedback()

    try {
      const updatedProfessional = professional.active
        ? await deactivateProfessional(professional.id)
        : await activateProfessional(professional.id)
        setProfessionals((currentProfessionals) =>
        sortProfessionals(
          currentProfessionals.map((currentProfessional) =>
            currentProfessional.id === professional.id
              ? updatedProfessional
              : currentProfessional,
          ),
        ),
      )
      setSuccessMessage(
        updatedProfessional.active
          ? 'Profissional ativado com sucesso.'
          : 'Profissional inativado com sucesso.',
      )
      return updatedProfessional
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE)
      return null
    } finally {
      setActionId(null)
    }
  }

  return {
    actionId,
    clearFeedback,
    editProfessional,
    errorMessage,
    isLoading,
    isSubmitting,
    loadProfessionals,
    professionals,
    addProfessional,
    successMessage,
    toggleProfessionalStatus,
  }
}