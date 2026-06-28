import { useContext } from 'react'
import { AdminContext } from '../contexts/adminContext.js'

const DEMO_ADMIN = {
  name: 'Administrador',
  password: 'admin',
  username: 'admin',
}

export function useAdmin() {
  const context = useContext(AdminContext)

  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de AdminProvider.')
  }

  function identifyAdmin({ password, username }) {
    const isValidAdmin =
      username.trim() === DEMO_ADMIN.username && password === DEMO_ADMIN.password

    if (!isValidAdmin) {
      throw new Error('Credenciais administrativas inválidas.')
    }

    context.setAdmin({
      name: DEMO_ADMIN.name,
      username: DEMO_ADMIN.username,
    })
  }

  return {
    ...context,
    identifyAdmin,
  }
}
