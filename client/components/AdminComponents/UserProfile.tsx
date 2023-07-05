import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

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
  const [createUserClicked, setCreateUserClicked] = useState(false)

  useEffect(() => {
    console.log('UserProfile component mounting')
  }, [name, selectedIcon])

  const handleIconClick = (icon: string) => {
    onSelectIcon(icon)
    setCreateUserClicked(true)
  }

  console.log('UserProfile component rendering')

  if (createUserClicked) {
    return <Navigate to="/create-user" replace={true} />
  }

  return (
    <div className="user-profile">
      <p>Welcome, {name}!</p>
      <p>Please create a user to be added to the database</p>
      <div className="user-profile__icons">
        <img
          src="/user-icons/IMG_3366.JPG"
          alt="User Icon 1"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/IMG_3366.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/IMG_3366.JPG')}
        />
        <img
          src="/user-icons/icon_1.JPG"
          alt="User Icon 2"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/icon_1.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/icon_1.JPG')}
        />
        <img
          src="/user-icons/icon_2.JPG"
          alt="User Icon 3"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/icon_2.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/icon_2.JPG')}
        />
        {/* Add more pre-existing user icons as needed */}
      </div>
      {selectedIcon && (
        <div className="selected-icon">
          <img
            src={selectedIcon}
            alt="Selected Icon"
            className="selected-icon__image"
          />
        </div>
      )}
    </div>
  )
}

export default UserProfile
