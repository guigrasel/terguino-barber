import { useEffect, useState } from 'react'
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import { listAppointments } from '../services/appointmentService.js'
import { listClients } from '../services/clientService.js'
import { listProfessionals } from '../services/professionalService.js'
import { listServices } from '../services/serviceService.js'
import { getTodayDateInputValue, timeToMinutes } from '../utils/date.js'

const LOAD_ERROR_MESSAGE =
  'Não foi possível carregar a agenda. Tente novamente.'

function mapById(records) {
  return new Map(records.map((record) => [String(record.id), record]))
}

function compareScheduleRecords(first, second) {
  const firstProfessional = first.professional?.name || ''
  const secondProfessional = second.professional?.name || ''
  const professionalComparison = firstProfessional.localeCompare(
    secondProfessional,
    'pt-BR',
  )

  if (professionalComparison !== 0) {
    return professionalComparison
  }

  return timeToMinutes(first.startTime) - timeToMinutes(second.startTime)
}

function enrichAppointments({ appointments, clients, professionals, services }) {
  const clientsById = mapById(clients)
  const professionalsById = mapById(professionals)
  const servicesById = mapById(services)

  return appointments
    .map((appointment) => ({
      ...appointment,
      client: clientsById.get(String(appointment.clientId)),
      isTimeOccupied: appointment.status !== APPOINTMENT_STATUS.CANCELED,
      professional: professionalsById.get(String(appointment.professionalId)),
      service: servicesById.get(String(appointment.serviceId)),
    }))
    .sort(compareScheduleRecords)
}

export function useSchedule() {
  const [appointments, setAppointments] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [professionals, setProfessionals] = useState([])
  const [selectedDate, setSelectedDate] = useState(getTodayDateInputValue())
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadSchedule() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const appointmentParams = selectedProfessionalId
          ? { date: selectedDate, professionalId: selectedProfessionalId }
          : { date: selectedDate }
        const [
          appointmentRecords,
          clientRecords,
          professionalRecords,
          serviceRecords,
        ] = await Promise.all([
          listAppointments(appointmentParams),
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

        if (isMounted) {
          setAppointments(enrichedAppointments)
          setProfessionals(professionalRecords)
        }
      } catch {
        if (isMounted) {
          setAppointments([])
          setErrorMessage(LOAD_ERROR_MESSAGE)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSchedule()

    return () => {
      isMounted = false
    }
  }, [selectedDate, selectedProfessionalId])

  return {
    appointments,
    errorMessage,
    isLoading,
    professionals,
    selectedDate,
    selectedProfessionalId,
    setSelectedDate,
    setSelectedProfessionalId,
  }
}
