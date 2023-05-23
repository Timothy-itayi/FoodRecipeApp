import React from 'react'

import CreateProfile from './components/CreateProfile'

import Header from './components/Header'
import Footer from './components/Footer'

import Nav from './components/Nav'

function App() {
  return (
    <>
      <div className="app">
        <h1>HelloFresh Twists</h1>
        <Header />
        <Nav />

        <Footer />
      </div>
    </>
  )
}

export default App
