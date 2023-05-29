import React from 'react'

import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import MainFeed from './components/MainFeed'
import ScrollToTop from './components/Scroll'

function App() {
  return (
    <div className="app">
      <Header />

      <MainFeed />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
