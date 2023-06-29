import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Post } from './types'

const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

interface AuthenticatedProps {
  children: React.ReactNode
  posts: Post[] // Add the posts prop with the appropriate type
}

export function IfAuthenticated(props: AuthenticatedProps) {
  const { children, posts } = props
  const isAuthenticated = useIsAuthenticated()
  return isAuthenticated ? <>{children}</> : null
}

export function IfNotAuthenticated(props: AuthenticatedProps) {
  const { children } = props
  const isAuthenticated = useIsAuthenticated()
  return !isAuthenticated ? <>{children}</> : null
}

export default IfAuthenticated
