import React from 'react'
import { Authenticated } from './Authenticated'
import { NotAuthenticated } from './NotAuthenticated'
import { NavGroup, NavButton } from '../Styled'
import { useAuth0 } from '@auth0/auth0-react'
import { Post } from '../types'

interface NavProps {
  isAuthenticated: boolean
  userName: string
  posts: Post[]
}

const Nav: React.FC<NavProps> = ({ isAuthenticated, posts }) => {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleSignOut = () => {
    console.log('sign out')
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect()
  }

  return (
    <>
      <NavGroup className="beige-nav">
        <Authenticated>
          <NavButton role="button" name="Sign out" onClick={handleSignOut}>
            Sign out
          </NavButton>
          {user && <p>Signed in as: {user.name}</p>}
        </Authenticated>
        <IfNotAuthenticated>
          {isAuthenticated ? (
            <p>Oops, technical difficulties</p>
          ) : (
            <NavButton role="button" name="Sign in" onClick={handleSignIn}>
              Sign in
            </NavButton>
          )}
        </IfNotAuthenticated>
      </NavGroup>
    </>
  )
}

export default Nav
