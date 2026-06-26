import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import ClientIdentificationForm from '../../../components/ClientIdentificationForm/index.jsx'
import { APP_ROUTES } from '../../../constants/routes.js'
import { useClient } from '../../../hooks/useClient.js'

function ClientLogin() {
  const navigate = useNavigate()
  const { identifyClient } = useClient()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleIdentifyClient(clientData) {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await identifyClient(clientData)
      navigate(APP_ROUTES.client.newAppointment)
    } catch {
      setErrorMessage(
        'Não foi possível identificar o cliente. Verifique a conexão e tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Área do cliente</span>
        <h1>Identifique-se para agendar seu horário</h1>
        <p>
          Informe seus dados para que o sistema encontre seu cadastro ou crie um
          novo registro simples de cliente.
        </p>
      </header>

      {errorMessage && (
        <AlertMessage title="Erro na identificação" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      <div className="page-grid">
        <section className="page-panel" aria-labelledby="client-login-title">
          <h2 id="client-login-title">Dados do cliente</h2>
          <ClientIdentificationForm
            isSubmitting={isSubmitting}
            onSubmit={handleIdentifyClient}
          />
        </section>

        <AlertMessage title="Identificação simples">
          Este protótipo não usa senha nem autenticação segura. Os dados servem
          apenas para associar seus agendamentos ao telefone informado.
        </AlertMessage>
      </div>
    </section>
  )
}

export default ClientLogin
