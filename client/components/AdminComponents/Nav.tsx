import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { NavGroup, NavButton } from '../Styled'
import { useAuth0 } from '@auth0/auth0-react'
import { Post } from '../types'

interface NavProps {
  isAuthenticated: boolean
  userName: string
  posts: Post[] // Add the posts prop
}

const Nav: React.FC<NavProps> = ({ isAuthenticated, posts }) => {
  // Update the props
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
        <IfAuthenticated posts={posts}>
          {' '}
          {/* Pass the posts prop */}
          <NavButton role="button" name="Sign out" onClick={handleSignOut}>
            Sign out
          </NavButton>
          {user && <p>Signed in as: {user?.name}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated posts={posts}>
          {' '}
          {/* Pass the posts prop */}
          <NavButton role="button" name="Sign in" onClick={handleSignIn}>
            Sign in
          </NavButton>
        </IfNotAuthenticated>
      </NavGroup>
    </>
  )
}

export default Nav
