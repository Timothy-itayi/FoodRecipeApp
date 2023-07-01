import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import SignIn from './components/SignIn'
import UserProfile from './components/AdminComponents/UserProfiles'

import ProtectedRoute from './components/AdminComponents/ProtectedRoutes'

import { Authenticated } from './components/AdminComponents/Authenticated'

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    // Optional: Show a loading spinner or component while Auth0 is checking the authentication status
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/protected-routes"
          element={
            <Authenticated>
              <ProtectedRoute
                path=""
                element={undefined}
                isAuthenticated={isAuthenticated}
              />
            </Authenticated>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Authenticated>
              <UserProfile
                name=""
                selectedIcon=""
                onSelectIcon={() => {
                  throw new Error('Function not implemented.')
                }}
              />
            </Authenticated>
          }
        />
        {/* Other routes */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
