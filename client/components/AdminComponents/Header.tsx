import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated'
import { NavGroup, NavButton } from '../Styled'
import { useAuth0 } from '@auth0/auth0-react'

const Nav = () => {
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
    <nav className="nav-container">
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {user && <p>Signed in as: {user?.name}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleSignIn}>Sign in</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
    </nav>
  )
}

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="header-title">
        Flavorful Recipes: "Embrace the Art of Flavorful Cooking"
      </h1>
      <Nav />
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
