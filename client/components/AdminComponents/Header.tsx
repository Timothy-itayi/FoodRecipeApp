import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import About from './About'

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
