import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import SignIn from './components/SignIn'
import UserProfile from './components/AdminComponents/UserProfiles'
import CreateUser from './components/AdminComponents/CreateUser'
import MainFeed from './components/AdminComponents/MainFeed'
import ProtectedRoute from './components/AdminComponents/ProtectedRoutes'
import { Post } from './components/types'
import PostContainer from './components/AdminComponents/PostContainer'
import PostFetcher from './components/AdminComponents/PostFetcher'

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
            <ProtectedRoute
              path=""
              element={undefined}
              isAuthenticated={false}
            />
          }
        />
        <Route
          path="/user-profile"
          element={
            <UserProfile
              name=""
              selectedIcon=""
              onSelectIcon={() => {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
        <Route
          path="/create-user"
          element={
            <CreateUser
              selectedIcon=""
              onCreateUser={(username, userEmail) => {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
        <Route path="/post-container" element={<PostContainer />} />
        <Route
          path="/post-fetcher"
          element={
            <PostFetcher
              setPostsData={(value) => {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
        <Route
          path="/main-feed"
          element={
            <ProtectedRoute
              path=""
              element={
                <MainFeed
                  posts={[]}
                  handleDeletePost={(id) => {
                    throw new Error('Function not implemented.')
                  }}
                />
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
