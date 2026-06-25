import { NavLink, Outlet } from 'react-router-dom'
import { APP_ROUTES } from '../constants/routes.js'
import Button from '../components/Button/index.jsx'
import './layouts.css'

const adminNavItems = [
  { label: 'Dashboard', to: APP_ROUTES.admin.dashboard },
  { label: 'Profissionais', to: APP_ROUTES.admin.professionals },
  { label: 'Serviços', to: APP_ROUTES.admin.services },
  { label: 'Agenda', to: APP_ROUTES.admin.schedule },
  { label: 'Histórico', to: APP_ROUTES.admin.history },
]

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <NavLink className="admin-brand" to={APP_ROUTES.admin.dashboard}>
          Gestão Terguino
        </NavLink>

        <nav className="admin-nav" aria-label="Navegação administrativa">
          {adminNavItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === APP_ROUTES.admin.dashboard}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button as={NavLink} to={APP_ROUTES.client.home} variant="ghost">
          Ver área do cliente
        </Button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
