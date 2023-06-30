import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import { Post } from './components/types'
import PostFetcher from './components/PostFetcher'
import MainFeed from './components/MainFeed'
import PostContainer from './components/PostContainer'
import { deletePost } from './apis/posts'
import UserProfile from './components/UserProfiles'

const App = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [postsData, setPostsData] = useState<Post[]>([])

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

  return (
    <Router>
      <div>
        <Header />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
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
              path="/"
              element={
                isUserAuthenticated ? (
                  <>
                    <PostContainer />
                    <PostFetcher setPostsData={setPostsData} />
                    <MainFeed
                      posts={postsData}
                      handleDeletePost={handleDeletePost}
                    />
                  </>
                ) : (
                  <SignIn />
                )
              }
            />
          </Routes>
        )}
        <Footer />
      </div>
    </Router>
  )
}

export default App
