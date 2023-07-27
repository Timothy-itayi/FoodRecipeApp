import React, { useState } from 'react'
import { addUser } from '../../../apis/user'
import CreateUser from './CreateUser'

interface UserProfileProps {
  name: string
  selectedIcon: string
  onSelectIcon: (icon: string) => void
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  selectedIcon,
  onSelectIcon,
}) => {
  const [userEmail, setUserEmail] = useState('')

  const handleIconClick = (icon: string) => {
    onSelectIcon(icon)
  }

  const handleCreateUser = async (username: string, user_email: string) => {
    try {
      // Call the API to add the user
      await addUser({ username, user_email })
      console.log('added', username, 'successfully')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="user-profile">
      <p>Welcome, {name}!</p>
      {!selectedIcon ? (
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
          <CreateUser
            selectedIcon={selectedIcon}
            onCreateUser={handleCreateUser}
          />
        </>
      )}
    </div>
  )
}

export default UserProfile
