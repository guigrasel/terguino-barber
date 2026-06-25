import { NavLink } from 'react-router-dom'
import Button from '../../../components/Button/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'

function NewAppointment() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Agendamento</span>
        <h1>Novo agendamento</h1>
        <p>
          Espaço reservado para escolha de profissional, serviço, data e horário
          disponível.
        </p>
      </header>

      <EmptyState
        title="Fluxo de agendamento em construção"
        description="Os controles serão conectados aos hooks e serviços nas próximas etapas."
        action={
          <Button as={NavLink} to={APP_ROUTES.client.confirmation}>
            Ver confirmação provisória
          </Button>
        }
      />
    </section>
  )
}

export default NewAppointment
