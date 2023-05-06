import React from 'react'
import SignupForm from './components/SignupForm'
import CreateProfile from './components/CreateProfile'
import MainFeed from './components/MainFeed'
import Header from './components/Header'
import Footer from './components/Footer'
import PostPage from './components/Postpage'

function App() {
  return (
    <>
      <div className="app">
        <h1>HelloFresh Twists</h1>
        <Header/>
        {/* <SignupForm /> */}
        <CreateProfile />
        
        <PostPage />
        <MainFeed />
        <Footer/>
      </div>
    </>
  )
}

export default App
