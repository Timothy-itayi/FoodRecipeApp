import React, { useState, useEffect } from 'react'
import { User, useAuth0 } from '@auth0/auth0-react'

import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'

import Nav from './components/AdminComponents/Nav'

import { Post } from './components/types'
import PostContainer from './components/AdminComponents/BodyComponents/PostContainer'
import UserPosts from './components/AdminComponents/BodyComponents/UserPosts'
import UserProfile from './components/AdminComponents/BodyComponents/UserProfile'

export interface CustomUser {
  username: string
  userEmail: string
}

const App: React.FC = () => {
  const { isLoading, isAuthenticated, user } = useAuth0<CustomUser>()
  const [selectedIcon, setSelectedIcon] = useState('')

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  // Assuming you have some initial posts data here, or you can start with an empty array
  const initialPosts: Post[] = []

  // Handle the creation of new posts
  const handleCreatePost = (newPostWithUserId: Post) => {
    // Update the posts state with the new post
    setPosts([...posts, newPostWithUserId])
  }

  const handleCreateUser = (
    username: string,
    userEmail: string,
    selectedIcon: string
  ) => {
    setUser(username, userEmail, selectedIcon)
  }

  // Initialize the posts state with the initialPosts data
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Nav isAuthenticated={isAuthenticated} userName={user?.username || ''} />
      {isAuthenticated ? (
        <>
          <UserProfile
            name={''}
            selectedIcon={selectedIcon}
            onSelectIcon={handleIconSelect}
            onCreateUser={handleCreateUser}
          />
          <PostContainer posts={posts} />
          <UserPosts
            User={user}
            handleCreatePost={handleCreatePost}
            id={0}
            username={user?.username || ''}
            user_email={user?.userEmail || ''}
            posts={posts}
          />
        </>
      ) : (
        <div>Please log in to access the content.</div>
      )}
      <Footer />
    </>
  )
}

export default App

function setUser(username: string, userEmail: string, selectedIcon: string) {
  throw new Error('Function not implemented.')
}
