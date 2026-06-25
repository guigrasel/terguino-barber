import Loading from '../../../components/Loading/index.jsx'

function Schedule() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Agenda</span>
        <h1>Agenda administrativa</h1>
        <p>
          Esta rota concentrará a visualização de horários por profissional e
          data.
        </p>
      </header>

      <section className="page-panel" aria-labelledby="schedule-preview-title">
        <h2 id="schedule-preview-title">Prévia da agenda</h2>
        <Loading label="Estrutura de agenda preparada" />
      </section>
    </section>
  )
}

export default Schedule
