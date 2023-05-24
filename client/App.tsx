import React from 'react'

import CreateProfile from './components/CreateProfile'

import Header from './components/Header'
import Footer from './components/Footer'

import Nav from './components/Nav'
import MainFeed from './components/MainFeed'

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <MainFeed />

        <Footer />
      </div>
    </>
  )
}

export default App
