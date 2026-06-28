import { useEffect, useState } from 'react'
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import { listAppointments } from '../services/appointmentService.js'
import { listClients } from '../services/clientService.js'
import { listProfessionals } from '../services/professionalService.js'
import { listServices } from '../services/serviceService.js'
import {
  addDaysToDateInputValue,
  compareDateAndTimeDesc,
  getTodayDateInputValue,
  isAppointmentBeforeNow,
} from '../utils/date.js'

export const HISTORY_STATUS_FILTER = {
  ALL: 'all',
  CANCELED: APPOINTMENT_STATUS.CANCELED,
  COMPLETED: APPOINTMENT_STATUS.COMPLETED,
  PAST_SCHEDULED: 'pastScheduled',
}

const LOAD_ERROR_MESSAGE =
  'Não foi possível carregar o histórico. Tente novamente.'

function mapById(records) {
  return new Map(records.map((record) => [String(record.id), record]))
}

function isHistoryAppointment(appointment) {
  return (
    appointment.status === APPOINTMENT_STATUS.CANCELED ||
    appointment.status === APPOINTMENT_STATUS.COMPLETED ||
    isAppointmentBeforeNow(appointment)
  )
}

function matchesStatusFilter(appointment, statusFilter) {
  if (statusFilter === HISTORY_STATUS_FILTER.ALL) {
    return true
  }

  if (statusFilter === HISTORY_STATUS_FILTER.PAST_SCHEDULED) {
    return (
      appointment.status === APPOINTMENT_STATUS.SCHEDULED &&
      isAppointmentBeforeNow(appointment)
    )
  }

  return appointment.status === statusFilter
}

function enrichAppointments({ appointments, clients, professionals, services }) {
  const clientsById = mapById(clients)
  const professionalsById = mapById(professionals)
  const servicesById = mapById(services)

  return appointments.map((appointment) => ({
    ...appointment,
    client: clientsById.get(String(appointment.clientId)),
    professional: professionalsById.get(String(appointment.professionalId)),
    service: servicesById.get(String(appointment.serviceId)),
  }))
}

function filterHistoryAppointments({
  appointments,
  endDate,
  professionalId,
  startDate,
  status,
}) {
  return appointments
    .filter((appointment) => isHistoryAppointment(appointment))
    .filter((appointment) => appointment.date >= startDate)
    .filter((appointment) => appointment.date <= endDate)
    .filter((appointment) =>
      professionalId ? String(appointment.professionalId) === professionalId : true,
    )
    .filter((appointment) => matchesStatusFilter(appointment, status))
    .sort(compareDateAndTimeDesc)
}

export function useAppointmentHistory() {
  const today = getTodayDateInputValue()
  const [endDate, setEndDate] = useState(today)
  const [errorMessage, setErrorMessage] = useState('')
  const [historyAppointments, setHistoryAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [professionals, setProfessionals] = useState([])
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(
    HISTORY_STATUS_FILTER.ALL,
  )
  const [startDate, setStartDate] = useState(addDaysToDateInputValue(today, -30))

  useEffect(() => {
    let isMounted = true

    async function loadHistory() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [
          appointmentRecords,
          clientRecords,
          professionalRecords,
          serviceRecords,
        ] = await Promise.all([
          listAppointments(),
          listClients(),
          listProfessionals(),
          listServices(),
        ])
        const enrichedAppointments = enrichAppointments({
          appointments: appointmentRecords,
          clients: clientRecords,
          professionals: professionalRecords,
          services: serviceRecords,
        })
        const filteredAppointments = filterHistoryAppointments({
          appointments: enrichedAppointments,
          endDate,
          professionalId: selectedProfessionalId,
          startDate,
          status: selectedStatus,
        })

        if (isMounted) {
          setHistoryAppointments(filteredAppointments)
          setProfessionals(professionalRecords)
        }
      } catch {
        if (isMounted) {
          setHistoryAppointments([])
          setErrorMessage(LOAD_ERROR_MESSAGE)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadHistory()

    return () => {
      isMounted = false
    }
  }, [endDate, selectedProfessionalId, selectedStatus, startDate])

  return {
    endDate,
    errorMessage,
    historyAppointments,
    isLoading,
    professionals,
    selectedProfessionalId,
    selectedStatus,
    setEndDate,
    setSelectedProfessionalId,
    setSelectedStatus,
    setStartDate,
    startDate,
  }
}
