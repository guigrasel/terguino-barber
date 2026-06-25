import EmptyState from '../../../components/EmptyState/index.jsx'

function AppointmentHistory() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Histórico</span>
        <h1>Histórico de atendimentos</h1>
        <p>
          Área para consulta de atendimentos realizados, clientes, serviços e
          valores.
        </p>
      </header>

      <EmptyState
        title="Histórico ainda sem dados"
        description="A consulta será alimentada pela camada de serviços quando a persistência simulada for implementada."
      />
    </section>
  )
}

export default AppointmentHistory
