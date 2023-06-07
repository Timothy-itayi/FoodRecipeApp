import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import SignIn from './components/SignIn'
import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'

import { Post } from './components/types'
import PostFetcher from './components/PostFetcher'
import MainFeed from './components/MainFeed'

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [postsData, setPostsData] = useState<Post[]>([]) // State for storing the fetched posts data

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    console.log('Posts data:', postsData) // Log the posts data received from the backend
  }, [postsData])

  return (
    <div>
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : isUserAuthenticated ? (
        <>
          <PostFetcher setPostsData={setPostsData} />
          <MainFeed posts={postsData} />
        </>
      ) : (
        <SignIn />
      )}
      <Footer />
    </div>
  )
}

export default App
