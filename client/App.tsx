import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserPosts from './components/UserPosts'
import SignIn from './components/SignIn'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated)
  }, [isAuthenticated])

  return (
    <div>
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : isUserAuthenticated ? (
        <UserPosts />
      ) : (
        <SignIn />
      )}
      <Footer />
    </div>
  )
}

export default App
