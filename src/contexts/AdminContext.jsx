import { useMemo, useState } from 'react'
import { AdminContext } from './adminContext.js'

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null)

  function logout() {
    setAdmin(null)
  }

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin),
      logout,
      setAdmin,
    }),
    [admin],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
