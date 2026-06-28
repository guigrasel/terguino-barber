import { useEffect, useState } from 'react'
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import { listAppointmentsByDate } from '../services/appointmentService.js'
import { listActiveProfessionals } from '../services/professionalService.js'
import { listActiveServices } from '../services/serviceService.js'
import { getTodayDateInputValue } from '../utils/date.js'

const LOAD_ERROR_MESSAGE =
  'Não foi possível carregar o resumo administrativo. Tente novamente.'

export function useDashboardSummary() {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [summary, setSummary] = useState({
    activeProfessionals: 0,
    activeServices: 0,
    todayAppointments: 0,
  })

  useEffect(() => {
    let isMounted = true

    async function loadSummary() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [appointments, professionals, services] = await Promise.all([
          listAppointmentsByDate(getTodayDateInputValue()),
          listActiveProfessionals(),
          listActiveServices(),
        ])
        const activeAppointments = appointments.filter(
          (appointment) => appointment.status !== APPOINTMENT_STATUS.CANCELED,
        )

        if (isMounted) {
          setSummary({
            activeProfessionals: professionals.length,
            activeServices: services.length,
            todayAppointments: activeAppointments.length,
          })
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

    loadSummary()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    errorMessage,
    isLoading,
    summary,
  }
}
