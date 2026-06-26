import { NavLink, useLocation } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import AppointmentSummary from '../../../components/AppointmentSummary/index.jsx'
import Button from '../../../components/Button/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'

function AppointmentConfirmation() {
  const location = useLocation()
  const appointment = location.state?.appointment

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Confirmação</span>
        <h1>Agendamento confirmado</h1>
        <p>Seu horário foi registrado na agenda da barbearia.</p>
      </header>

      <div className="page-panel">
        {appointment ? (
          <AlertMessage type="success" title="Tudo certo">
            O agendamento foi salvo com sucesso.
          </AlertMessage>
        ) : (
          <AlertMessage title="Detalhes indisponíveis">
            Não encontramos os detalhes do agendamento nesta navegação.
          </AlertMessage>
        )}

        {appointment && <AppointmentSummary appointment={appointment} />}

        <div className="page-actions">
          <Button as={NavLink} to={APP_ROUTES.client.myAppointments}>
            Ver meus horários
          </Button>
          <Button as={NavLink} to={APP_ROUTES.client.home} variant="secondary">
            Voltar ao início
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AppointmentConfirmation