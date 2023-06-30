import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import SignIn from './components/SignIn'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import { Post } from './components/types'
import PostFetcher from './components/PostFetcher'
import MainFeed from './components/MainFeed'
import PostContainer from './components/PostContainer'
import { deletePost } from './apis/posts'
import UserProfile from './components/UserProfiles'
import CreateUser from './components/CreateUser'
import IfAuthenticated from './components/Authenticated'
import { IfNotAuthenticated } from './components/Authenticated'

const App = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [postsData, setPostsData] = useState<Post[]>([])
  const [selectedIcon, setSelectedIcon] = useState('')

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    console.log('Posts data:', postsData)
  }, [postsData])

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      console.log('Post deleted successfully:', id)
      setPostsData((prevPostsData) =>
        prevPostsData.filter((post) => post.id !== id)
      )
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  const handleCreateUser = (username: string, userEmail: string) => {
    // Add logic to create user and update database
    console.log('Creating user:', username, userEmail)
  }

  return (
    <div>
      <Header />

      <IfAuthenticated posts={postsData}>
        <>
          <UserProfile
            selectedIcon={selectedIcon}
            onSelectIcon={handleIconSelect}
            name={''}
          />
          <CreateUser
            selectedIcon={selectedIcon}
            onCreateUser={handleCreateUser}
          />
          <PostContainer />
          <PostFetcher setPostsData={setPostsData} />
          <MainFeed posts={postsData} handleDeletePost={handleDeletePost} />
        </>
      </IfAuthenticated>
      <IfNotAuthenticated posts={postsData}>
        <SignIn />
      </IfNotAuthenticated>
      <Footer />
    </div>
  )
}

export default App
