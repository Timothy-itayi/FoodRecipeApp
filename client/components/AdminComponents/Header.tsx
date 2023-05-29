import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated'
import { NavGroup, NavButton } from '../Styled'
import { useAuth0 } from '@auth0/auth0-react'
import About from './About'

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
  const [showAbout, setShowAbout] = useState(false)

  const toggleAbout = () => {
    setShowAbout((prevState) => !prevState)
  }

  return (
    <header className="header-container">
      <h1 className="header-title">
        <img className="logo" src="/logo.jpeg"></img>
        "Embrace the Art of Flavorful cooking"
      </h1>

      <Nav />

      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={toggleAbout}>
              About
            </a>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      {showAbout && <About />}
    </header>
  )
}

export default Header
