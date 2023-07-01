import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface IfNotAuthenticatedProps {
  children: React.ReactNode
}

export function NotAuthenticated({ children }: IfNotAuthenticatedProps) {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <p>Loading...</p>
  }

  return !isAuthenticated ? null : <p>Oops, technical difficulties</p>
}

export default NotAuthenticated
