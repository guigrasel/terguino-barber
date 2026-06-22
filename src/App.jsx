import './App.css'

const stack = [
  'React',
  'Vite',
  'React Router',
  'Axios',
  'React Hook Form',
  'date-fns',
  'JSON Server',
]

function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <h1 id="page-title">Sistema de Agendamento para Barbearias</h1>
        <p>
          A base do projeto está configurada. As próximas tasks implementarão
          rotas, layouts, serviços e os fluxos de agendamento.
        </p>
      </section>

      <section className="status-card" aria-labelledby="stack-title">
        <div>
          <span className="status-dot" aria-hidden="true" />
          <strong>Frontend e API simulada preparados</strong>
        </div>

        <h2 id="stack-title">Stack instalada</h2>
        <ul>
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
