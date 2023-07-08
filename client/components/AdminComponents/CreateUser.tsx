import React, { useState } from 'react'
import { addUser } from '../../apis/user'
import CreatedUser from './CreatedUser'

interface CreateUserProps {
  selectedIcon: string
}

const CreateUser: React.FC<CreateUserProps> = ({ selectedIcon }) => {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)

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

      const userId = await addUser(newUser)

      if (userId) {
        console.log(userId)
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

  if (successMessage) {
    return <CreatedUser isAuthenticated={false} />
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
