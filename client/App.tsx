import React from 'react'

import CreateProfile from './components/CreateProfile'

import Header from './components/Header'
import Footer from './components/Footer'
import SignupForm from './components/SignupForm'

function App() {
  return (
    <>
      <div className="app">
        <h1>HelloFresh Twists</h1>
        <Header />
        <SignupForm />

        <Footer />
      </div>
    </>
  )
}

export default App
