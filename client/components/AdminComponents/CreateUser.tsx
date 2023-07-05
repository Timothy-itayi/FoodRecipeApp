import React, { useState } from 'react'
import { addUser } from '../../apis/user'

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

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEmail(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onCreateUser(username, userEmail)
    setUsername('')
    setUserEmail('')
  }

  // const handleCreateButtonClick = async () => {
  //   try {
  //     await addUser({ name: username, email: userEmail })
  //     console.log('User created successfully')
  //     setUsername('')
  //     setUserEmail('')
  //   } catch (error) {
  //     console.error('Error creating user:', error)
  //   }
  // }

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
        <button type="button">Create User (Alt)</button>
      </form>
    </div>
  )
}

export default CreateUser
