import React, { useState } from 'react'
import { addUser } from '../../../apis/user'
import { Link, useNavigate } from 'react-router-dom'
import UserPosts from './UserPosts'
import MainFeed from './MainFeed'

interface CreateUserProps {
  selectedIcon: string
  onCreateUser: (username: string, userEmail: string, userId: number) => void
}

const CreateUser: React.FC<CreateUserProps> = ({
  selectedIcon,
  onCreateUser,
}) => {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)
  const [showUserPosts, setShowUserPosts] = useState(false)
  const [showMainFeed, setShowMainFeed] = useState(false)
  const [userId, setUserId] = useState<number>(0) // Add userId state
  const navigate = useNavigate()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEmail(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const newUser = { username, user_email: userEmail }

      const createdUserId = await addUser(newUser)

      if (createdUserId) {
        setUserId(createdUserId) // Set the userId
        console.log(createdUserId)
        onCreateUser(username, userEmail, createdUserId)
        setSuccessMessage(true)
        setUsername('')
        setUserEmail('')
      } else {
        console.error('Error creating user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleMakePost = () => {
    setShowUserPosts(true)
  }

  const handleShowMainFeed = () => {
    setShowMainFeed(true)
  }

  if (showUserPosts) {
    return <UserPosts handleCreatePost={() => {}} userId={0} posts={[]} />
  }

  if (showMainFeed) {
    return <MainFeed posts={[]} />
  }

  if (successMessage) {
    return (
      <div>
        <h2>User Created!</h2>
        <p>Thank you for adding a user.</p>
        <p>What would you like to do next?</p>
        <button onClick={handleMakePost}>Make a Post</button>
        <button onClick={handleShowMainFeed}>Show Main Feed</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Create User</h2>
      <div>
        <img
          className="selected-icon__image"
          src={selectedIcon}
          alt="Selected Icon"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="userEmail">User Email:</label>
        <input
          type="email"
          id="userEmail"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
        <br />
        <button className="login-button" type="submit">
          Create User
        </button>
      </form>
    </div>
  )
}

export default CreateUser
