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
import UserProfile from './components/AdminComponents/BodyComponents/UserProfile'
import { IfAuthenticated } from './components/AdminComponents/BodyComponents/Authenticated'
import CreateUser from './components/AdminComponents/BodyComponents/CreateUser'
import Nav from './components/AdminComponents/Nav'
import MainFeed from './components/AdminComponents/BodyComponents/MainFeed'

import UserPosts from './components/AdminComponents/BodyComponents/UserPosts'
import { Post } from './components/types'

interface CustomUser {
  name: string
  email: string
}

const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0<CustomUser>()
  const [selectedIcon, setSelectedIcon] = useState('')
  const [posts, setPosts] = useState<Post[]>([]) // Add posts state

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  const handleCreatePost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost])
  }

  const handleDeletePost = (id: number) => {
    // Implement the logic to delete the post
    // Update the posts state accordingly
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Nav isAuthenticated={isAuthenticated} userName={user?.name || ''} />
      <Routes>
        <Route path="/" element={<Home />} />
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
            isAuthenticated ? (
              <CreateUser
                selectedIcon={selectedIcon}
                onCreateUser={(username: string, userEmail: string) => {
                  // Handle the creation of the user here
                  console.log('Creating user:', username, userEmail)
                }}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/created-user"
          element={
            isAuthenticated ? (
              <Navigate to="/created-user/mainfeed" replace={true} />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route
            path="mainfeed"
            element={
              <MainFeed posts={posts} handleDeletePost={handleDeletePost} />
            }
          />
          <Route
            path="userposts"
            element={
              <UserPosts
                handleCreatePost={handleCreatePost}
                userId={0}
                posts={[]}
              />
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

const Home = () => {
  return (
    <IfAuthenticated>
      <Navigate to="/user-profile" replace={true} />
    </IfAuthenticated>
  )
}

export default App
