import EmptyState from '../../../components/EmptyState/index.jsx'

function Services() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Cadastros</span>
        <h1>Serviços</h1>
        <p>
          Rota reservada para gerenciar os serviços oferecidos pela barbearia.
        </p>
      </header>

      <EmptyState
        title="Cadastro de serviços em construção"
        description="Formulários, validações e persistência serão conectados nas próximas tasks."
      />
    </section>
  )
}

export default Services
