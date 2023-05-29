import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserPosts from './UserPosts'

const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth0() // Call the useAuth0 hook and destructure isAuthenticated
  return isAuthenticated
}

interface Props {
  children: React.ReactNode
}

export function IfAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}

// Example usage
const Authenticated: React.FC = () => {
  return (
    <div>
      <h1>Welcome, authenticated user!</h1>

      <IfAuthenticated>
        <UserPosts />
      </IfAuthenticated>
    </div>
  )
}

export default Authenticated
