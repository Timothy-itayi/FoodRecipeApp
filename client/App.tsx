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

  return (
    <div>
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : isUserAuthenticated ? (
        <>
          <PostFetcher setPostsData={setPostsData} />
          {postsData.length > 0 ? (
            <MainFeed posts={postsData} />
          ) : (
            <>
              <MainFeed
                posts={[
                  {
                    id: 1,
                    title: 'Dummy Post 1',
                    description: 'Lorem ipsum dolor sit amet.',
                    user_id: 1,
                    image_url: null,
                  },
                  {
                    id: 2,
                    title: 'Dummy Post 2',
                    description: 'Consectetur adipiscing elit.',
                    user_id: 2,
                    image_url: null,
                  },
                  // Add more dummy posts as needed
                ]}
              />
            </>
          )}
        </>
      ) : (
        <SignIn />
      )}
      <Footer />
    </div>
  )
}

export default App
