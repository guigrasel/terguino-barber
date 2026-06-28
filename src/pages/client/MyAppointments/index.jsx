import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import AppointmentCard from '../../../components/AppointmentCard/index.jsx'
import Button from '../../../components/Button/index.jsx'
import CancelAppointmentModal from '../../../components/CancelAppointmentModal/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'
import {
  canCancelAppointment,
  useAppointments,
} from '../../../hooks/useAppointments.js'
import { useClient } from '../../../hooks/useClient.js'
import './MyAppointments.css'

const appointmentSections = [
  {
    emptyDescription: 'Você ainda não possui compromissos futuros.',
    key: 'future',
    title: 'Próximos horários',
    variant: 'future',
  },
  {
    emptyDescription: 'Seus atendimentos realizados aparecerão aqui.',
    key: 'past',
    title: 'Histórico',
    variant: 'past',
  },
  {
    emptyDescription: 'Agendamentos cancelados ficam registrados aqui.',
    key: 'canceled',
    title: 'Cancelados',
    variant: 'canceled',
  },
]

function MyAppointments() {
  const { client } = useClient()
  const {
    cancelClientAppointment,
    clientAppointmentGroups,
    clientAppointments,
    clearErrorMessage,
    clearSuccessMessage,
    errorMessage,
    isCanceling,
    isLoadingClientAppointments,
    loadClientAppointments,
    successMessage,
  } = useAppointments({ loadOptions: false })
  const [appointmentToCancel, setAppointmentToCancel] = useState(null)
  const hasAppointments = clientAppointments.length > 0

  useEffect(() => {
    if (client?.id) {
      loadClientAppointments(client.id)
    }
  }, [client?.id, loadClientAppointments])

  function openCancelModal(appointment) {
    clearErrorMessage()
    clearSuccessMessage()
    setAppointmentToCancel(appointment)
  }

  function closeCancelModal() {
    if (!isCanceling) {
      setAppointmentToCancel(null)
    }
  }

  async function confirmCancellation() {
    const canceledAppointment = await cancelClientAppointment({
      appointmentId: appointmentToCancel.id,
      clientId: client.id,
    })

    if (canceledAppointment) {
      setAppointmentToCancel(null)
    }
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Meus horários</span>
        <h1>Meus agendamentos</h1>
        <p>
          Consulte seus próximos compromissos, atendimentos anteriores e
          registros cancelados.
        </p>
      </header>

      {!client && (
        <EmptyState
          title="Identifique-se para ver seus horários"
          description="Informe seu nome e telefone antes de consultar seus agendamentos."
          action={
            <Button as={NavLink} to={APP_ROUTES.client.home}>
              Ir para identificação
            </Button>
          }
        />
      )}

      {client && errorMessage && (
        <AlertMessage title="Atenção" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      {client && successMessage && (
        <AlertMessage title="Tudo certo" type="success">
          {successMessage}
        </AlertMessage>
      )}

      {client && isLoadingClientAppointments && (
        <Loading label="Carregando seus agendamentos..." />
      )}

      {client && !isLoadingClientAppointments && !errorMessage && !hasAppointments && (
        <EmptyState
          title="Nenhum agendamento encontrado"
          description="Quando você confirmar um horário, ele aparecerá nesta página."
          action={
            <Button as={NavLink} to={APP_ROUTES.client.newAppointment}>
              Agendar horário
            </Button>
          }
        />
      )}

      {client && !isLoadingClientAppointments && hasAppointments && (
        <div className="my-appointments">
          {appointmentSections.map((section) => {
            const appointments = clientAppointmentGroups[section.key]

            return (
              <section
                className="my-appointments__section"
                key={section.key}
                aria-labelledby={`appointments-${section.key}-title`}
              >
                <header className="my-appointments__section-header">
                  <h2 id={`appointments-${section.key}-title`}>
                    {section.title}
                  </h2>
                  <span>{appointments.length}</span>
                </header>

                {appointments.length === 0 ? (
                  <p className="my-appointments__empty">
                    {section.emptyDescription}
                  </p>
                ) : (
                  <div className="my-appointments__list">
                    {appointments.map((appointment) => (
                      <AppointmentCard
                        appointment={appointment}
                        canCancel={canCancelAppointment(appointment)}
                        isCanceling={
                          isCanceling && appointmentToCancel?.id === appointment.id
                        }
                        key={appointment.id}
                        onCancel={openCancelModal}
                        variant={section.variant}
                      />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      )}

      <CancelAppointmentModal
        appointment={appointmentToCancel}
        isCanceling={isCanceling}
        isOpen={Boolean(appointmentToCancel)}
        onClose={closeCancelModal}
        onConfirm={confirmCancellation}
      />
    </section>
  )
}

export default MyAppointments
