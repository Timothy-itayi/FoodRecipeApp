import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AboutContent from './AboutContent'

const Header = () => {
  const [showAbout, setShowAbout] = useState(false)

  const toggleAbout = () => {
    setShowAbout((prevState) => !prevState)
  }

  return (
    <header className="header-container">
      <div className="header-content">
        <img className="logo" src="/newLogo.jpeg" alt="Logo" />
        <h1 className="header-title">Embrace the Art of Flavorful Cooking</h1>
      </div>

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

      {showAbout && <AboutContent />}
    </header>
  )
}

export default Header
