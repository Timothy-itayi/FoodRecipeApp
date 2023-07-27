import React, { useState, useEffect } from 'react'
import { User, useAuth0 } from '@auth0/auth0-react'

import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import Nav from './components/AdminComponents/Nav'
import { Post } from './components/types'
import PostContainer from './components/AdminComponents/BodyComponents/PostContainer'
import UserPosts from './components/AdminComponents/BodyComponents/UserPosts'
import UserProfile from './components/AdminComponents/BodyComponents/UserProfile'
import { fetchUsers } from './apis/user'
import { getAllPosts, addNewPost } from './apis/posts'

const App: React.FC = () => {
  const { isLoading, isAuthenticated, user } = useAuth0<User>()
  const [selectedIcon, setSelectedIcon] = useState<string>('')

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  const [posts, setPosts] = useState<Post[]>([]) // Initialize posts state with an empty array
  const [users, setUsers] = useState<User[]>([]) // Initialize users state with an empty array

  useEffect(() => {
    // Fetch posts and users data when the component mounts
    const fetchData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          getAllPosts(),
          fetchUsers(),
        ])

        setPosts(postsData)
        setUsers(usersData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array to run the effect only once when the component mounts

  // Initialize the counter to 1

  return (
    <>
      <Header />
      <Nav isAuthenticated={isAuthenticated} userName={user?.name || ''} />
      {isAuthenticated ? (
        <>
          <UserProfile
            name={user?.name || ''}
            selectedIcon={selectedIcon}
            onSelectIcon={handleIconSelect}
            onCreateUser={handleCreateUser}
          />
          <PostContainer posts={posts} />
          <UserPosts
            User={user}
            handleCreatePost={addNewPost} // Assuming addNewPost is the correct function to add new posts
            id={user?.sub || ''} // Use the 'sub' property from the user object as the ID, or an empty string as a fallback
            username={user?.name || ''}
            user_email={user?.email || ''}
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
