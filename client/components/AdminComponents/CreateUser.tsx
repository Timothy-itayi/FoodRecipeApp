import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser } from '../../apis/user'
import MainFeed from './MainFeed'

interface CreateUserProps {
  selectedIcon: string
  onCreateUser: (username: string, userEmail: string) => void
}

const CreateUser: React.FC<CreateUserProps> = ({ selectedIcon }) => {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { getAccessTokenSilently } = useAuth0()

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
      const authToken = await getAccessTokenSilently()

      if (authToken) {
        const newUser = { username, user_email: userEmail }

        const userId = await addUser(newUser, authToken)

        if (userId) {
          setSuccessMessage('User created successfully')
          setUsername('')
          setUserEmail('')
        } else {
          console.error('Error creating user')
        }
      } else {
        console.error('Auth token is undefined')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  // Render MainFeed component if success message is set
  if (successMessage) {
    return (
      <MainFeed
        posts={[]}
        handleDeletePost={function (id: number): void {
          throw new Error('Function not implemented.')
        }}
      />
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
        <button type="submit">Create User</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  )
}

export default CreateUser
