import EmptyState from '../../../components/EmptyState/index.jsx'

function Professionals() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Cadastros</span>
        <h1>Profissionais</h1>
        <p>
          Rota reservada para listagem, cadastro, edição e ativação de
          profissionais.
        </p>
      </header>

      <EmptyState
        title="Cadastro de profissionais em construção"
        description="A manutenção dos profissionais será implementada na fase de cadastros administrativos."
      />
    </section>
  )
}

export default Professionals
