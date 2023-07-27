import React, { useState } from 'react'
import { addUser } from '../../../apis/user'
import CreateUser from './CreateUser'

interface UserProfileProps {
  name: string
  selectedIcon: string
  onSelectIcon: (icon: string) => void
  onCreateUser: (
    username: string,
    user_email: string,
    selectedIcon: string
  ) => void
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  selectedIcon,
  onSelectIcon,
  onCreateUser,
}) => {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)
  const [userSelectedIcon, setUserSelectedIcon] = useState('')
  const [isCreateUserVisible, setIsCreateUserVisible] = useState(false) // New state variable

  const handleIconClick = (icon: string) => {
    onSelectIcon(icon)
    setUserSelectedIcon(icon)
    setIsCreateUserVisible(true) // Show the user creation form
  }

  const handleCreateUser = async () => {
    try {
      // Call the API to add the user
      await addUser({ username, user_email: userEmail })

      // Call the prop with the required arguments
      onCreateUser(username, userEmail, userSelectedIcon)

      // Show the success message and reset the form fields
      setSuccessMessage(true)
      setUsername('')
      setUserEmail('')
      setIsCreateUserVisible(false) // Hide the user creation form after successful creation
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="user-profile">
      <p>Welcome, {name}!</p>
      {!userSelectedIcon && !isCreateUserVisible ? (
        <>
          <p>Please select an icon to proceed</p>
          <div className="user-profile__icons">
            <img
              src="/user-icons/icon.JPG"
              alt="User Icon 1"
              className={`user-profile__icon ${
                selectedIcon === '/user-icons/icon.JPG' ? 'selected' : ''
              }`}
              onClick={() => handleIconClick('/user-icons/icon.JPG')}
            />
            {/* Rest of the icons */}
          </div>
        </>
      ) : (
        <>
          {isCreateUserVisible ? ( // Use isCreateUserVisible to control the display
            <CreateUser
              selectedIcon={userSelectedIcon}
              onCreateUser={handleCreateUser}
            />
          ) : (
            <>
              <div className="selected-icon">
                <img
                  src={userSelectedIcon}
                  alt="Selected Icon"
                  className="selected-icon__image"
                />
              </div>
              {!successMessage && (
                <button onClick={() => setIsCreateUserVisible(true)}>
                  Create User
                </button>
              )}
            </>
          )}
          {successMessage && (
            <div>
              <h2>User Created!</h2>
              <p>Thank you for adding a user.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default UserProfile
