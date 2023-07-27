import React, { useState } from 'react'
import { addUser } from '../../../apis/user'

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Call the API to add the user
      await addUser({ username, user_email: userEmail })

      // Call the prop with the required arguments
      onCreateUser(username, userEmail, selectedIcon)

      // Show the success message and reset the form fields
      setSuccessMessage(true)
      setUsername('')
      setUserEmail('')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEmail(event.target.value)
  }

  if (successMessage) {
    return (
      <div>
        <h2>User Created!</h2>
        <p>Thank you for adding a user.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Create User</h2>
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
