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
          src="/user-icons/icon.JPG"
          alt="User Icon 1"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/icon.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/icon.JPG')}
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
        <img
          src="/user-icons/icon4.JPG"
          alt="User Icon 4"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/icon4.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/icon4.JPG')}
        />
        <img
          src="/user-icons/icon5.JPG"
          alt="User Icon 5"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/icon5.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/icon5.JPG')}
        />
        <img
          src="/user-icons/icon6.JPG"
          alt="User Icon 6"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/icon6.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/icon6.JPG')}
        />
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
