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
  const [selectedIcon, setSelectedIcon] = useState('')

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Header />
      <Nav isAuthenticated={isAuthenticated} userName={user?.name || ''} />
      <Routes>
        <Route path="/" element={<Navigate to="/user-profile" />} />
        <Route
          path="/user-profile"
          element={
            isAuthenticated ? (
              <UserProfile
                name={user?.name || ''}
                selectedIcon={selectedIcon}
                onSelectIcon={handleIconSelect}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/create-user"
          element={
            <CreateUser
              selectedIcon={selectedIcon}
              onCreateUser={(username: string, userEmail: string) => {
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
