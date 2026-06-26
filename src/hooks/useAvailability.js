import { useCallback, useState } from 'react'
import { listAppointmentsByProfessionalAndDate } from '../services/appointmentService.js'
import { getAvailableTimeSlots } from '../utils/availability.js'

const GENERIC_ERROR_MESSAGE =
  'Não foi possível carregar os horários disponíveis. Tente novamente.'

export function useAvailability() {
  const [appointments, setAppointments] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadAvailability = useCallback(
    async ({ date, durationMinutes, professional }) => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const professionalAppointments =
          await listAppointmentsByProfessionalAndDate(professional.id, date)
        const timeSlots = getAvailableTimeSlots({
          appointments: professionalAppointments,
          durationMinutes,
          workEnd: professional.workEnd,
          workStart: professional.workStart,
        })

        setAppointments(professionalAppointments)
        setAvailableTimeSlots(timeSlots)

        return timeSlots
      } catch {
        setAppointments([])
        setAvailableTimeSlots([])
        setErrorMessage(GENERIC_ERROR_MESSAGE)

        return []
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  function clearAvailability() {
    setAppointments([])
    setAvailableTimeSlots([])
    setErrorMessage('')
  }

  return {
    appointments,
    availableTimeSlots,
    clearAvailability,
    errorMessage,
    isLoading,
    loadAvailability,
  }
}