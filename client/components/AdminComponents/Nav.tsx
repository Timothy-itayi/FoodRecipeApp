import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { NavGroup, NavButton } from '../Styled'
import { Post } from '../types'

interface NavProps {
  isAuthenticated: boolean
  userName: string
}

const Nav: React.FC<NavProps> = ({ isAuthenticated, userName }) => {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect()
  }

  const handleSignOut = () => {
    console.log('sign out')
    logout()
  }

  return (
    <NavGroup className="beige-nav">
      {isAuthenticated ? (
        <>
          <NavButton role="button" name="Sign out" onClick={handleSignOut}>
            Sign out
          </NavButton>
        </>
      ) : (
        <>
          <NavButton
            role="button"
            name="Sign in with Google"
            onClick={handleSignIn}
          >
            Sign in with Google
          </NavButton>
          <NavButton
            role="button"
            name="Sign in with Twitter"
            onClick={handleSignIn}
          >
            Sign in with Twitter
          </NavButton>
          <NavButton
            role="button"
            name="Sign in with GitHub"
            onClick={handleSignIn}
          >
            Sign in with GitHub
          </NavButton>
        </>
      )}
    </NavGroup>
  )
}

export default Nav
