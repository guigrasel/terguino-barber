import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import AdminIdentificationForm from '../components/AdminIdentificationForm/index.jsx'
import AlertMessage from '../components/AlertMessage/index.jsx'
import { APP_ROUTES } from '../constants/routes.js'
import Button from '../components/Button/index.jsx'
import { useAdmin } from '../hooks/useAdmin.js'
import './layouts.css'

const adminNavItems = [
  { label: 'Dashboard', to: APP_ROUTES.admin.dashboard },
  { label: 'Profissionais', to: APP_ROUTES.admin.professionals },
  { label: 'Serviços', to: APP_ROUTES.admin.services },
  { label: 'Agenda', to: APP_ROUTES.admin.schedule },
  { label: 'Histórico', to: APP_ROUTES.admin.history },
]

function AdminLayout() {
  const { admin, identifyAdmin, isAuthenticated, logout } = useAdmin()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleIdentifyAdmin(adminData) {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      identifyAdmin(adminData)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <NavLink className="admin-brand" to={APP_ROUTES.admin.dashboard}>
          Gestão Terguino
        </NavLink>

        {isAuthenticated && (
          <>
            <div className="admin-session" aria-label="Gestor identificado">
              <span>{admin.name}</span>
              <small>{admin.username}</small>
            </div>

            <nav className="admin-nav" aria-label="Navegação administrativa">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === APP_ROUTES.admin.dashboard}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Button onClick={logout} type="button" variant="ghost">
              Sair da gestão
            </Button>
          </>
        )}

        <Button as={NavLink} to={APP_ROUTES.client.home} variant="ghost">
          Ver área do cliente
        </Button>
      </aside>

      <main className="admin-main">
        {isAuthenticated ? (
          <Outlet />
        ) : (
          <section className="page-shell">
            <header className="page-header">
              <span className="page-eyebrow">Área do gestor</span>
              <h1>Identifique-se para acessar a gestão</h1>
              <p>
                Use as credenciais simples do protótipo para acessar
                profissionais, serviços, agenda e histórico.
              </p>
            </header>

            {errorMessage && (
              <AlertMessage title="Acesso negado" type="error">
                {errorMessage}
              </AlertMessage>
            )}

            <div className="page-grid">
              <section className="page-panel" aria-labelledby="admin-login-title">
                <h2 id="admin-login-title">Credenciais administrativas</h2>
                <AdminIdentificationForm
                  isSubmitting={isSubmitting}
                  onSubmit={handleIdentifyAdmin}
                />
              </section>

              <AlertMessage title="Identificação simples">
                Para demonstração, use usuário <strong>admin</strong> e senha{' '}
                <strong>admin</strong>. Este protótipo não implementa
                autenticação real.
              </AlertMessage>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default AdminLayout
