import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/index.jsx'
import { APP_ROUTES } from '../../constants/routes.js'

function NotFound() {
  return (
    <main className="client-layout">
      <section className="client-main page-shell">
        <header className="page-header">
          <span className="page-eyebrow">404</span>
          <h1>Página não encontrada</h1>
          <p>
            A rota acessada não existe na aplicação. Use uma das áreas
            principais para continuar navegando.
          </p>
        </header>

        <div className="page-actions">
          <Button as={NavLink} to={APP_ROUTES.client.home}>
            Ir para cliente
          </Button>
          <Button as={NavLink} to={APP_ROUTES.admin.dashboard} variant="secondary">
            Ir para gestor
          </Button>
        </div>
      </section>
    </main>
  )
}

export default NotFound
