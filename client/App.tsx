import React from 'react'
import SignupForm from './components/SignupForm'
import CreateProfile from './components/CreateProfile'
import MainFeed from './components/MainFeed'

function App() {
  return (
    <>
      <div className="app">
        <h1>HelloFresh Twists</h1>
        <SignupForm />
        <CreateProfile />
        <MainFeed />
      </div>
    </>
  )
}

export default App
