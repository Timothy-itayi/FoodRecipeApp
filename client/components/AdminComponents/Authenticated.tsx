import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface AuthenticatedProps {
  children: React.ReactNode
}

export function Authenticated({ children }: AuthenticatedProps) {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? <>{children}</> : null
}

export default Authenticated
