import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

interface ProtectedRouteProps {
  path: string
  element: React.ReactNode
  isAuthenticated: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    // Show loading spinner or component while checking authentication status
    return <p>Loading...</p>
  }

  if (!isAuthenticated) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/sign-in" replace />
  }

  // Render the protected component if authenticated
  return <Route path={path} element={element} />
}

export default ProtectedRoute
