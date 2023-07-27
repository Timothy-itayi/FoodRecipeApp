import React, { useState } from 'react'
import { addUser } from '../../../apis/user'
import { Link, useNavigate } from 'react-router-dom'
import { CustomUser } from '../../../App'
import { useAuth0 } from '@auth0/auth0-react'

interface CreateUserProps {
  selectedIcon: string
  onCreateUser: (
    username: string,
    userEmail: string,
    selectedIcon: string
  ) => void
}

const CreateUser: React.FC<CreateUserProps> = ({
  selectedIcon,
  onCreateUser,
}) => {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)

  const { user } = useAuth0<CustomUser>()

  // Destructure the username and userEmail from the User object (if available)
  const { username: userUsername, userEmail: userUserEmail } = user || {}

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
      // Create a new user object with the required information
      const newUser = {
        username: username || userUsername || '', // Use the provided username or the username from the User object
        userEmail: userEmail || userUserEmail || '', // Use the provided userEmail or the userEmail from the User object
        selectedIcon,
      }

      const createdUserId = await addUser(newUser)

      if (createdUserId) {
        console.log(createdUserId)
        onCreateUser(newUser.username, newUser.userEmail, newUser.selectedIcon)
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
    navigate(`/user/${user}/posts`)
  }

  if (successMessage) {
    return (
      <div>
        <h2>User Created!</h2>
        <p>Thank you for adding a user.</p>
        <p>What would you like to do next?</p>
        <button onClick={handleMakePost}>Make a Post</button>
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
