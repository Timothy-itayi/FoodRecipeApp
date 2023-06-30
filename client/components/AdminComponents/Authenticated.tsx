import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Post } from '../types'

const useIsAuthenticated = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  // Check if there is a stored authentication state in session storage
  const storedIsAuthenticated = sessionStorage.getItem('isAuthenticated')

  console.log('isAuthenticated:', isAuthenticated)
  console.log('isLoading:', isLoading)
  console.log('storedIsAuthenticated:', storedIsAuthenticated)

  // Return true if there is a stored authentication state or if the user is currently authenticated
  return storedIsAuthenticated === 'true' || (isAuthenticated && !isLoading)
}

interface AuthenticatedProps {
  children: React.ReactNode
  posts: Post[]
}

export function IfAuthenticated(props: AuthenticatedProps) {
  const { children, posts } = props
  const isAuthenticated = useIsAuthenticated()

  // Store the current authentication state in session storage
  sessionStorage.setItem('isAuthenticated', String(isAuthenticated))

  return isAuthenticated ? <>{children}</> : null
}

export function IfNotAuthenticated(props: AuthenticatedProps) {
  const { children, posts } = props
  const isAuthenticated = useIsAuthenticated()

  // Store the current authentication state in session storage
  sessionStorage.setItem('isAuthenticated', String(isAuthenticated))

  return !isAuthenticated ? <>{children}</> : null
}

export default IfAuthenticated
