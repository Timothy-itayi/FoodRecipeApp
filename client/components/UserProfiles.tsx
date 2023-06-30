import React from 'react'

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
  const handleIconClick = (icon: string) => {
    onSelectIcon(icon)
  }

  return (
    <div className="user-profile">
      <h2 className="user-profile__name">{name}</h2>
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
          src="/user-icons/photo-output_22.JPG"
          alt="User Icon 2"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/photo-output_22.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/photo-output_22.JPG')}
        />
        <img
          src="/user-icons/photo-output_83.JPG"
          alt="User Icon 3"
          className={`user-profile__icon ${
            selectedIcon === '/user-icons/photo-output_83.JPG' ? 'selected' : ''
          }`}
          onClick={() => handleIconClick('/user-icons/photo-output_83.JPG')}
        />
        {/* Add more pre-existing user icons as needed */}
      </div>
    </div>
  )
}

export default UserProfile
