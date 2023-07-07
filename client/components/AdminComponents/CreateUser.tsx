import React, { useState } from 'react'
import { addUser } from '../../apis/user'
import { useAuth0 } from '@auth0/auth0-react'

interface CreateUserProps {
  selectedIcon: string
  onCreateUser: (username: string, userEmail: string) => void
}

const CreateUser: React.FC<CreateUserProps> = ({
  selectedIcon,
  onCreateUser,
}) => {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')

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
    onCreateUser(username, userEmail)
    setUsername('')
    setUserEmail('')
  }

  const handleCreateButtonClick = async () => {
    try {
      const authToken = await getAccessTokenSilently({})

      await addUser({ name: username, email: userEmail }, authToken)
      console.log('User created successfully')
      setUsername('')
      setUserEmail('')
    } catch (error) {
      console.error('Error creating user:', error)
    }
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
        <button onClick={handleCreateButtonClick} type="submit">
          Create User
        </button>
      </form>
    </div>
  )
}

export default CreateUser
