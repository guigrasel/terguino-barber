import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import AppointmentSummary from '../../../components/AppointmentSummary/index.jsx'
import Button from '../../../components/Button/index.jsx'
import DateSelector from '../../../components/DateSelector/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import ProfessionalCard from '../../../components/ProfessionalCard/index.jsx'
import ServiceCard from '../../../components/ServiceCard/index.jsx'
import TimeSlotGrid from '../../../components/TimeSlotGrid/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'
import { useAppointments } from '../../../hooks/useAppointments.js'
import { useClient } from '../../../hooks/useClient.js'
import { isDateBeforeToday } from '../../../utils/date.js'
import './NewAppointment.css'

const STEPS = {
  PROFESSIONAL: 'professional',
  SERVICE: 'service',
  DATE: 'date',
  TIME: 'time',
  REVIEW: 'review',
}

const stepItems = [
  { id: STEPS.PROFESSIONAL, label: 'Profissional' },
  { id: STEPS.SERVICE, label: 'Serviço' },
  { id: STEPS.DATE, label: 'Data' },
  { id: STEPS.TIME, label: 'Horário' },
  { id: STEPS.REVIEW, label: 'Revisão' },
]

function NewAppointment() {
  const { client, isAuthenticated } = useClient()
  const navigate = useNavigate()
  const {
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
  } = useAppointments()
  const [currentStep, setCurrentStep] = useState(STEPS.PROFESSIONAL)
  const [selectedProfessional, setSelectedProfessional] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [dateError, setDateError] = useState('')

  if (!isAuthenticated) {
    return <Navigate replace to={APP_ROUTES.client.home} />
  }

  function selectProfessional(professional) {
    setSelectedProfessional(professional)
    setSelectedTimeSlot(null)
    clearAvailableTimeSlots()
    clearErrorMessage()
    setCurrentStep(STEPS.SERVICE)
  }

  function selectService(service) {
    setSelectedService(service)
    setSelectedTimeSlot(null)
    clearAvailableTimeSlots()
    clearErrorMessage()
    setCurrentStep(STEPS.DATE)
  }

  function handleDateChange(date, isInvalid) {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
    clearAvailableTimeSlots()
    clearErrorMessage()
    setDateError(isInvalid ? 'Escolha uma data de hoje em diante.' : '')
  }

  async function handleLoadTimeSlots() {
    if (!selectedDate) {
      setDateError('Escolha uma data para ver horários disponíveis.')
      return
    }

    if (isDateBeforeToday(selectedDate)) {
      setDateError('Escolha uma data de hoje em diante.')
      return
    }

    setDateError('')
    await loadAvailableTimeSlots({
      date: selectedDate,
      professional: selectedProfessional,
      service: selectedService,
    })
    setCurrentStep(STEPS.TIME)
  }

  function selectTimeSlot(timeSlot) {
    setSelectedTimeSlot(timeSlot)
    clearErrorMessage()
    setCurrentStep(STEPS.REVIEW)
  }

  async function confirmAppointment() {
    const appointment = await createScheduledAppointment({
      client,
      date: selectedDate,
      professional: selectedProfessional,
      service: selectedService,
      timeSlot: selectedTimeSlot,
    })

    if (!appointment) {
      setSelectedTimeSlot(null)
      setCurrentStep(STEPS.TIME)
      return
    }
    navigate(APP_ROUTES.client.confirmation, {
      state: {
        appointment: {
          ...appointment,
          clientName: client.name,
          professionalName: selectedProfessional.name,
          serviceName: selectedService.name,
        },
      },
    })
  }

  function goToStep(step) {
    setCurrentStep(step)
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Agendamento</span>
        <h1>Novo agendamento</h1>
        <p>
          {client.name}, este espaço será usado para escolher profissional,
          serviço, data e horário disponível.
        </p>
      </header>

      <ol className="appointment-steps" aria-label="Etapas do agendamento">
        {stepItems.map((step, index) => (
          <li
            className={currentStep === step.id ? 'appointment-steps__active' : ''}
            key={step.id}
          >
            <span>{index + 1}</span>
            {step.label}
          </li>
        ))}
      </ol>

      {errorMessage && (
        <AlertMessage title="Atenção" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      {isLoading && <Loading label="Carregando opções de agendamento..." />}

      {!isLoading && currentStep === STEPS.PROFESSIONAL && (
        <section className="page-panel" aria-labelledby="professional-step-title">
          <h2 id="professional-step-title">Escolha um profissional</h2>
          {activeProfessionals.length === 0 ? (
            <EmptyState
              title="Nenhum profissional disponível"
              description="No momento não há profissionais ativos para novos agendamentos."
            />
          ) : (
            <div className="appointment-card-grid">
              {activeProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  isSelected={selectedProfessional?.id === professional.id}
                  onSelect={selectProfessional}
                  professional={professional}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {!isLoading && currentStep === STEPS.SERVICE && (
        <section className="page-panel" aria-labelledby="service-step-title">
          <h2 id="service-step-title">Escolha um serviço</h2>
          {activeServices.length === 0 ? (
            <EmptyState
              title="Nenhum serviço disponível"
              description="No momento não há serviços ativos para novos agendamentos."
            />
          ) : (
            <div className="appointment-card-grid">
              {activeServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  isSelected={selectedService?.id === service.id}
                  onSelect={selectService}
                  service={service}
                />
              ))}
            </div>
          )}
          <div className="page-actions">
            <Button
              onClick={() => goToStep(STEPS.PROFESSIONAL)}
              type="button"
              variant="secondary"
            >
              Voltar
            </Button>
          </div>
        </section>
      )}
      {!isLoading && currentStep === STEPS.DATE && (
        <section className="page-panel" aria-labelledby="date-step-title">
          <h2 id="date-step-title">Escolha a data</h2>
          <DateSelector
            error={dateError}
            onChange={handleDateChange}
            value={selectedDate}
          />
          <div className="page-actions">
            <Button
              onClick={() => goToStep(STEPS.SERVICE)}
              type="button"
              variant="secondary"
            >
              Voltar
            </Button>
            <Button
              disabled={isLoadingAvailability}
              onClick={handleLoadTimeSlots}
              type="button"
            >
              {isLoadingAvailability ? 'Buscando...' : 'Buscar horários'}
            </Button>
          </div>
        </section>
      )}

      {!isLoading && currentStep === STEPS.TIME && (
        <section className="page-panel" aria-labelledby="time-step-title">
          <h2 id="time-step-title">Escolha o horário</h2>
          {isLoadingAvailability && <Loading label="Buscando horários..." />}

          {!isLoadingAvailability && availableTimeSlots.length === 0 && (
            <EmptyState
              title="Nenhum horário disponível"
              description="Escolha outra data, profissional ou serviço para encontrar novos horários."
            />
          )}

          {!isLoadingAvailability && availableTimeSlots.length > 0 && (
            <TimeSlotGrid
              onSelect={selectTimeSlot}
              selectedStartTime={selectedTimeSlot?.startTime}
              slots={availableTimeSlots}
            />
          )}

          <div className="page-actions">
            <Button
              onClick={() => goToStep(STEPS.DATE)}
              type="button"
              variant="secondary"
            >
              Voltar
            </Button>
          </div>
        </section>
      )}

      {!isLoading && currentStep === STEPS.REVIEW && (
        <section className="page-panel" aria-labelledby="review-step-title">
          <h2 id="review-step-title">Revise o agendamento</h2>
          <AppointmentSummary
            client={client}
            professional={selectedProfessional}
            selectedDate={selectedDate}
            service={selectedService}
            timeSlot={selectedTimeSlot}
          />
          <div className="page-actions">
            <Button
              onClick={() => goToStep(STEPS.TIME)}
              type="button"
              variant="secondary"
            >
              Voltar
            </Button>
            <Button disabled={isSaving} onClick={confirmAppointment} type="button">
              {isSaving ? 'Confirmando...' : 'Confirmar agendamento'}
            </Button>
          </div>
        </section>
      )}
    </section>
  )
}

export default NewAppointment