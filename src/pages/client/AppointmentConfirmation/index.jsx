import { NavLink } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import Button from '../../../components/Button/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'

function AppointmentConfirmation() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Confirmação</span>
        <h1>Agendamento confirmado</h1>
        <p>
          Página provisória para o retorno visual após a criação de um
          agendamento.
        </p>
      </header>

      <div className="page-panel">
        <AlertMessage type="success" title="Tudo certo">
          Quando o fluxo real estiver implementado, os detalhes do compromisso
          aparecerão aqui.
        </AlertMessage>

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
