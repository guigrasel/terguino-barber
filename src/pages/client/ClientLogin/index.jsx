import { NavLink } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import Button from '../../../components/Button/index.jsx'
import Input from '../../../components/Input/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'

function ClientLogin() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Área do cliente</span>
        <h1>Identifique-se para agendar seu horário</h1>
        <p>
          Esta página será responsável por localizar ou cadastrar o cliente antes
          do fluxo de agendamento.
        </p>
      </header>

      <div className="page-grid">
        <section className="page-panel" aria-labelledby="client-login-title">
          <h2 id="client-login-title">Dados do cliente</h2>
          <div className="form-preview">
            <Input label="Nome" name="name" placeholder="Seu nome completo" />
            <Input label="Telefone" name="phone" placeholder="(00) 00000-0000" />
            <Button as={NavLink} to={APP_ROUTES.client.newAppointment}>
              Continuar
            </Button>
          </div>
        </section>

        <AlertMessage title="Página provisória">
          A integração com clientes será adicionada na fase de identificação.
        </AlertMessage>
      </div>
    </section>
  )
}

export default ClientLogin
