import { useCallback, useEffect, useState } from 'react'
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import {
  createAppointment,
  listAppointmentsByClient,
  listAppointmentsByProfessionalAndDate,
} from '../services/appointmentService.js'
import {
  listActiveProfessionals,
  listProfessionals,
} from '../services/professionalService.js'
import { listActiveServices, listServices } from '../services/serviceService.js'
import { getAvailableTimeSlots } from '../utils/availability.js'
import {
  compareDateAndTime,
  isAppointmentBeforeNow,
} from '../utils/date.js'

const LOAD_ERROR_MESSAGE =
  'Não foi possível carregar as opções de agendamento. Tente novamente.'
const AVAILABILITY_ERROR_MESSAGE =
  'Não foi possível carregar os horários disponíveis. Tente novamente.'
const SAVE_ERROR_MESSAGE =
  'Não foi possível confirmar o agendamento. Tente novamente.'
const UNAVAILABLE_TIME_MESSAGE =
  'Esse horário não está mais disponível. Escolha outro horário para continuar.'
const CLIENT_APPOINTMENTS_ERROR_MESSAGE =
  'Não foi possível carregar seus agendamentos. Tente novamente.'

const EMPTY_APPOINTMENT_GROUPS = {
  canceled: [],
  future: [],
  past: [],
}

function mapById(records) {
  return new Map(records.map((record) => [String(record.id), record]))
}

function groupClientAppointments(appointments) {
  return appointments.reduce(
    (groups, appointment) => {
      if (appointment.status === APPOINTMENT_STATUS.CANCELED) {
        groups.canceled.push(appointment)
        return groups
      }

      if (
        appointment.status === APPOINTMENT_STATUS.COMPLETED ||
        isAppointmentBeforeNow(appointment)
      ) {
        groups.past.push(appointment)
        return groups
      }

      groups.future.push(appointment)
      return groups
    },
    {
      canceled: [],
      future: [],
      past: [],
    },
  )
}

export function useAppointments({ loadOptions: shouldLoadOptions = true } = {}) {
  const [activeProfessionals, setActiveProfessionals] = useState([])
  const [activeServices, setActiveServices] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [clientAppointments, setClientAppointments] = useState([])
  const [clientAppointmentGroups, setClientAppointmentGroups] = useState(
    EMPTY_APPOINTMENT_GROUPS,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(shouldLoadOptions)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [isLoadingClientAppointments, setIsLoadingClientAppointments] =
    useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!shouldLoadOptions) {
      return undefined
    }

    let isMounted = true

    async function loadAppointmentOptions() {
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

    loadAppointmentOptions()

    return () => {
      isMounted = false
    }
  }, [shouldLoadOptions])

  const loadClientAppointments = useCallback(async (clientId) => {
    if (!clientId) {
      setClientAppointments([])
      setClientAppointmentGroups(EMPTY_APPOINTMENT_GROUPS)
      return []
    }

    setIsLoadingClientAppointments(true)
    setErrorMessage('')

    try {
      const [appointments, professionals, services] = await Promise.all([
        listAppointmentsByClient(clientId),
        listProfessionals(),
        listServices(),
      ])
      const professionalsById = mapById(professionals)
      const servicesById = mapById(services)
      const sortedAppointments = appointments
        .map((appointment) => ({
          ...appointment,
          professional: professionalsById.get(String(appointment.professionalId)),
          service: servicesById.get(String(appointment.serviceId)),
        }))
        .sort(compareDateAndTime)

      setClientAppointments(sortedAppointments)
      setClientAppointmentGroups(groupClientAppointments(sortedAppointments))

      return sortedAppointments
    } catch {
      setClientAppointments([])
      setClientAppointmentGroups(EMPTY_APPOINTMENT_GROUPS)
      setErrorMessage(CLIENT_APPOINTMENTS_ERROR_MESSAGE)

      return []
    } finally {
      setIsLoadingClientAppointments(false)
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
    clientAppointmentGroups,
    clientAppointments,
    createScheduledAppointment,
    errorMessage,
    isLoading,
    isLoadingAvailability,
    isLoadingClientAppointments,
    isSaving,
    loadAvailableTimeSlots,
    loadClientAppointments,
  }
}
