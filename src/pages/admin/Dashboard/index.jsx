import AlertMessage from '../../../components/AlertMessage/index.jsx'

function Dashboard() {
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
          <h2 id="dashboard-summary-title">Resumo provisório</h2>
          <ul className="summary-list">
            <li>
              <span>Agenda do dia</span>
              <strong>Em breve</strong>
            </li>
            <li>
              <span>Profissionais ativos</span>
              <strong>Em breve</strong>
            </li>
            <li>
              <span>Serviços disponíveis</span>
              <strong>Em breve</strong>
            </li>
          </ul>
        </section>

        <AlertMessage title="Base administrativa">
          Este layout concentra a navegação de gestão sem regras de negócio.
        </AlertMessage>
      </div>
    </section>
  )
}

export default Dashboard
