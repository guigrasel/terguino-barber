import EmptyState from '../../../components/EmptyState/index.jsx'

function MyAppointments() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Meus horários</span>
        <h1>Agendamentos do cliente</h1>
        <p>
          Esta rota exibirá compromissos ativos, históricos e ações de
          cancelamento quando a camada de dados estiver pronta.
        </p>
      </header>

      <EmptyState
        title="Nenhum agendamento carregado"
        description="A listagem será preenchida por hooks reutilizáveis, sem acesso direto à API pela página."
      />
    </section>
  )
}

export default MyAppointments
