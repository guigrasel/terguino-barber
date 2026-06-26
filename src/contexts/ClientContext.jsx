import { useMemo, useState } from 'react'
import { ClientContext } from './clientContext.js'

export function ClientProvider({ children }) {
  const [client, setClient] = useState(null)

  function logout() {
    setClient(null)
  }

  const value = useMemo(
    () => ({
      client,
      isAuthenticated: Boolean(client),
      logout,
      setClient,
    }),
    [client],
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}
