import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import SignIn from './components/SignIn'
import UserProfile from './components/AdminComponents/UserProfile'
import { Authenticated } from './components/AdminComponents/Authenticated'
import CreateUser from './components/AdminComponents/CreateUser'
import Nav from './components/AdminComponents/Nav'
import MainFeed from './components/AdminComponents/MainFeed'

const App = () => {
  console.log('App component mounting')
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    // Optional: Show a loading spinner or component while Auth0 is checking the authentication status
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Nav isAuthenticated={true} userName={''} />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/user-profile"
          element={
            <UserProfile
              name={''}
              selectedIcon={''}
              onSelectIcon={function (icon: string): void {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
        <Route
          path="/create-user"
          element={
            <CreateUser
              selectedIcon={''}
              onCreateUser={function (
                username: string,
                userEmail: string
              ): void {
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
              handleDeletePost={function (id: number): void {
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
