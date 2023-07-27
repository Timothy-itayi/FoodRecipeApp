import { useState } from 'react'
import { addUser } from '../../../apis/user'

interface UserProfileProps {
  name: string
  selectedIcon: string
  onSelectIcon: (icon: string) => void
  onCreateUser: (
    username: string,
    userEmail: string,
    selectedIcon: string
  ) => void
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  selectedIcon,
  onSelectIcon,
  onCreateUser,
}) => {
  const [createUserClicked, setCreateUserClicked] = useState(false)
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)

  const handleIconClick = (icon: string) => {
    onSelectIcon(icon)
    setCreateUserClicked(true) // Show the user creation form
  }
  console.log('icon selected', selectedIcon)
  const handleCreateUser = async () => {
    try {
      // Call the API to add the user
      await addUser({ username, userEmail })

      // Call the prop with the required arguments
      onCreateUser(username, userEmail, selectedIcon)

      // Show the success message and reset the form fields
      setSuccessMessage(true)
      setUsername('')
      setUserEmail('')
      setCreateUserClicked(false) // Hide the user creation form after successful creation
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
        </>
      ) : (
        <>
          <div className="selected-icon">
            <img
              src={selectedIcon}
              alt="Selected Icon"
              className="selected-icon__image"
            />
          </div>
          {successMessage ? (
            <div>
              <h2>User Created!</h2>
              <p>Thank you for adding a user.</p>
            </div>
          ) : (
            <div>
              <h2>Create User</h2>
              <form>
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
                <button className="login-button" onClick={handleCreateUser}>
                  Create User
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default UserProfile
