import React, { useState, useEffect } from 'react'
import { User, useAuth0 } from '@auth0/auth0-react'

import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'

import Nav from './components/AdminComponents/Nav'

import { Post } from './components/types'
import PostContainer from './components/AdminComponents/BodyComponents/PostContainer'
import UserPosts from './components/AdminComponents/BodyComponents/UserPosts'

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
  const handleCreatePost = (newPost: Post) => {
    // Update the posts state with the new post
    setPosts((prevPosts) => [...prevPosts, newPost])
  }

  // Initialize the posts state with the initialPosts data
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Nav isAuthenticated={isAuthenticated} userName={user?.name || ''} />
      <PostContainer posts={posts} />
      <UserPosts
        User={user}
        handleCreatePost={function (newPostWithUserId: Post): void {
          throw new Error('Function not implemented.')
        }}
        id={0}
        username={''}
        user_email={''}
        posts={[]}
      />
    </>
  )
}

export default App
