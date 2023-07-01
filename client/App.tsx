import React, { useState, useEffect } from 'react'
import { User, useAuth0 } from '@auth0/auth0-react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'

import UserProfile from './components/AdminComponents/UserProfile'
import { IfAuthenticated } from './components/AdminComponents/Authenticated'
import CreateUser from './components/AdminComponents/CreateUser'
import Nav from './components/AdminComponents/Nav'
import MainFeed from './components/AdminComponents/MainFeed'

interface CustomUser {
  name: string
  email: string
}

const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0<CustomUser>()

  if (isLoading) {
    // Optional: Show a loading spinner or component while Auth0 is checking the authentication status
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Nav isAuthenticated={isAuthenticated} userName={user?.name || ''} />
      <Routes>
        <Route path="/" element={''} />
        <Route
          path="/user-profile"
          element={
            isAuthenticated ? (
              <UserProfile
                name={user?.name || ''}
                selectedIcon={''}
                onSelectIcon={function (icon: string): void {
                  throw new Error('Function not implemented.')
                }}
              />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/create-user"
          element={
            <CreateUser
              selectedIcon={''}
              onCreateUser={(username, userEmail) => {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
        <Route
          path="/mainfeed"
          element={
            <MainFeed
              posts={[]}
              handleDeletePost={(id) => {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
