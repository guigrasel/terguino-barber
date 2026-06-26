import { APPOINTMENT_STATUS } from '../constants/appointmentStatus.js'
import { DEFAULT_SCHEDULE_INTERVAL_MINUTES } from '../constants/schedule.js'
import {
  addMinutesToTime,
  minutesToTime,
  timeToMinutes,
} from './date.js'

export function isCanceledAppointment(appointment) {
  return appointment.status === APPOINTMENT_STATUS.CANCELED
}

export function hasScheduleConflict(newStart, newEnd, existingAppointments) {
  const newStartMinutes = timeToMinutes(newStart)
  const newEndMinutes = timeToMinutes(newEnd)

  return existingAppointments.some((appointment) => {
    if (isCanceledAppointment(appointment)) {
      return false
    }

    const existingStartMinutes = timeToMinutes(appointment.startTime)
    const existingEndMinutes = timeToMinutes(appointment.endTime)

    return (
      newStartMinutes < existingEndMinutes &&
      newEndMinutes > existingStartMinutes
    )
  })
}

export function getAvailableTimeSlots({
  appointments = [],
  durationMinutes,
  intervalMinutes = DEFAULT_SCHEDULE_INTERVAL_MINUTES,
  workEnd,
  workStart,
}) {
  const workStartMinutes = timeToMinutes(workStart)
  const workEndMinutes = timeToMinutes(workEnd)

  if (
    workStartMinutes === null ||
    workEndMinutes === null ||
    !Number.isFinite(durationMinutes) ||
    durationMinutes <= 0 ||
    workStartMinutes >= workEndMinutes
  ) {
    return []
  }

  const slots = []

  for (
    let startMinutes = workStartMinutes;
    startMinutes + durationMinutes <= workEndMinutes;
    startMinutes += intervalMinutes
  ) {
    const startTime = minutesToTime(startMinutes)
    const endTime = addMinutesToTime(startTime, durationMinutes)

    if (!hasScheduleConflict(startTime, endTime, appointments)) {
      slots.push({
        endTime,
        startTime,
      })
    }
  }

  return slots
}