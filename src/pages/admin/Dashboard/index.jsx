import AlertMessage from '../../../components/AlertMessage/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import { useDashboardSummary } from '../../../hooks/useDashboardSummary.js'

function Dashboard() {
  const { errorMessage, isLoading, summary } = useDashboardSummary()

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Administração</span>
        <h1>Dashboard</h1>
        <p>
          Visão inicial do gestor para acompanhar a operação da barbearia.
        </p>
      </header>

      <div className="page-grid">
        <section className="page-panel" aria-labelledby="dashboard-summary-title">
          <h2 id="dashboard-summary-title">Resumo de hoje</h2>

          {isLoading && <Loading label="Carregando resumo..." />}

          {!isLoading && errorMessage && (
            <AlertMessage title="Atenção" type="error">
              {errorMessage}
            </AlertMessage>
          )}

          {!isLoading && !errorMessage && (
            <ul className="summary-list">
              <li>
                <span>Agendamentos de hoje</span>
                <strong>{summary.todayAppointments}</strong>
              </li>
              <li>
                <span>Profissionais ativos</span>
                <strong>{summary.activeProfessionals}</strong>
              </li>
              <li>
                <span>Serviços disponíveis</span>
                <strong>{summary.activeServices}</strong>
              </li>
            </ul>
          )}
        </section>

        <AlertMessage title="Base administrativa">
          Use o menu lateral para acompanhar agenda, histórico, profissionais e
          serviços.
        </AlertMessage>
      </div>
    </section>
  )
}

export default Dashboard
