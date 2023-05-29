import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const SignIn = () => {
  const { loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={handleSignIn}>Sign in with Auth0</button>
    </div>
  )
}

export default SignIn
