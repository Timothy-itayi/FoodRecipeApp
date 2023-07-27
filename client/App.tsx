import React, { useState, useEffect } from 'react'
import { User, useAuth0 } from '@auth0/auth0-react'

import Header from './components/AdminComponents/Header'
import Footer from './components/AdminComponents/Footer'
import Nav from './components/AdminComponents/Nav'
import { Post } from './components/types'
import PostContainer from './components/AdminComponents/BodyComponents/PostContainer'
import UserPosts from './components/AdminComponents/BodyComponents/UserPosts'
import UserProfile from './components/AdminComponents/BodyComponents/UserProfile'
import { addUser } from './apis/user'
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
    // Fetch posts data when the component mounts
    const fetchData = async () => {
      try {
        const postsData = await getAllPosts()
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array to run the effect only once when the component mounts

  const handleCreateUser = async (
    username: string,
    user_email: string,
    selectedIcon: string
  ): Promise<void> => {
    try {
      console.log('handleCreateUser function called.')
      // Call the API to add the user
      await addUser({ username, user_email: user_email })
      console.log('added', username, ' successfully')

      // Assuming the API call to add the user is successful and returns the new user data
      const newUser: User = {
        name: username,
        email: user_email,
        picture: selectedIcon,
        // Add any other properties you need from the user object
      }

      // Add the new user to the users state
    } catch (error) {
      console.error('Error creating user:', error)
    }

    // You can perform any additional operations here, such as showing a success message or refreshing the posts data.
  }

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
            user={user} // Pass the user object instead of User prop
            handleCreatePost={addNewPost}
            id={user?.sub || ''}
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
