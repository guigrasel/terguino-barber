import { useEffect, useState } from 'react'
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import {
  createAppointment,
  listAppointmentsByProfessionalAndDate,
} from '../services/appointmentService.js'
import { listActiveProfessionals } from '../services/professionalService.js'
import { listActiveServices } from '../services/serviceService.js'
import { getAvailableTimeSlots } from '../utils/availability.js'

const LOAD_ERROR_MESSAGE =
  'Não foi possível carregar as opções de agendamento. Tente novamente.'
const AVAILABILITY_ERROR_MESSAGE =
  'Não foi possível carregar os horários disponíveis. Tente novamente.'
const SAVE_ERROR_MESSAGE =
  'Não foi possível confirmar o agendamento. Tente novamente.'
const UNAVAILABLE_TIME_MESSAGE =
  'Esse horário não está mais disponível. Escolha outro horário para continuar.'

export function useAppointments() {
  const [activeProfessionals, setActiveProfessionals] = useState([])
  const [activeServices, setActiveServices] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadOptions() {
      try {
        const [professionals, services] = await Promise.all([
          listActiveProfessionals(),
          listActiveServices(),
        ])

        if (isMounted) {
          setActiveProfessionals(professionals)
          setActiveServices(services)
        }
      } catch {
        if (isMounted) {
          setErrorMessage(LOAD_ERROR_MESSAGE)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadOptions()

    return () => {
      isMounted = false
    }
  }, [])

  async function loadAvailableTimeSlots({ date, professional, service }) {
    setIsLoadingAvailability(true)
    setErrorMessage('')

    try {
      const appointments = await listAppointmentsByProfessionalAndDate(
        professional.id,
        date,
      )
      const slots = getAvailableTimeSlots({
        appointments,
        durationMinutes: service.durationMinutes,
        workEnd: professional.workEnd,
        workStart: professional.workStart,
      })

      setAvailableTimeSlots(slots)

      return slots
    } catch {
      setAvailableTimeSlots([])
      setErrorMessage(AVAILABILITY_ERROR_MESSAGE)

      return []
    } finally {
      setIsLoadingAvailability(false)
    }
  }

  async function createScheduledAppointment({
    client,
    date,
    professional,
    service,
    timeSlot,
  }) {
    setIsSaving(true)
    setErrorMessage('')

    try {
      const latestAppointments = await listAppointmentsByProfessionalAndDate(
        professional.id,
        date,
      )
      const latestSlots = getAvailableTimeSlots({
        appointments: latestAppointments,
        durationMinutes: service.durationMinutes,
        workEnd: professional.workEnd,
        workStart: professional.workStart,
      })
      const isStillAvailable = latestSlots.some(
        (slot) =>
          slot.startTime === timeSlot.startTime &&
          slot.endTime === timeSlot.endTime,
      )

      if (!isStillAvailable) {
        setAvailableTimeSlots(latestSlots)
        setErrorMessage(UNAVAILABLE_TIME_MESSAGE)

        return null
      }

      const appointment = await createAppointment({
        clientId: client.id,
        professionalId: professional.id,
        serviceId: service.id,
        date,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        status: APPOINTMENT_STATUS.SCHEDULED,
        totalPrice: service.price,
        createdAt: new Date().toISOString(),
        canceledAt: null,
      })

      return appointment
    } catch {
      setErrorMessage(SAVE_ERROR_MESSAGE)

      return null
    } finally {
      setIsSaving(false)
    }
  }
  function clearAvailableTimeSlots() {
    setAvailableTimeSlots([])
  }

  function clearErrorMessage() {
    setErrorMessage('')
  }

  return {
    activeProfessionals,
    activeServices,
    availableTimeSlots,
    clearAvailableTimeSlots,
    clearErrorMessage,
    createScheduledAppointment,
    errorMessage,
    isLoading,
    isLoadingAvailability,
    isSaving,
    loadAvailableTimeSlots,
  }
}