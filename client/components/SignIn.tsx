import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const SignIn = () => {
  const { loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    console.log('signed in ')
    loginWithRedirect()
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}

export default SignIn
