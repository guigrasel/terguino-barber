import { NavLink, Outlet } from 'react-router-dom'
import { APP_ROUTES } from '../constants/routes.js'
import Button from '../components/Button/index.jsx'
import { useClient } from '../hooks/useClient.js'
import { formatPhone } from '../utils/phone.js'
import './layouts.css'

const clientNavItems = [
  { label: 'Identificação', to: APP_ROUTES.client.home },
  { label: 'Agendar', to: APP_ROUTES.client.newAppointment },
  { label: 'Meus horários', to: APP_ROUTES.client.myAppointments },
]

function ClientLayout() {
  const { client, logout } = useClient()

  return (
    <div className="client-layout">
      <header className="client-header">
        <NavLink className="brand-link" to={APP_ROUTES.client.home}>
          Terguino Barber
        </NavLink>

        <nav className="client-nav" aria-label="Navegação do cliente">
          {clientNavItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="client-header__actions">
          {client && (
            <div className="client-session" aria-label="Cliente identificado">
              <span>{client.name}</span>
              <small>{formatPhone(client.phone)}</small>
              <Button onClick={logout} type="button" variant="secondary">
                Sair
              </Button>
            </div>
          )}

          <Button
            as={NavLink}
            className="layout-action"
            to={APP_ROUTES.admin.dashboard}
            variant="secondary"
          >
            Área do gestor
          </Button>
        </div>
      </header>

      <main className="client-main">
        <Outlet />
      </main>
    </div>
  )
}

export default ClientLayout
