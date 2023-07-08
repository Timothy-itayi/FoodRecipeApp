import React from 'react'
import { Link } from 'react-router-dom'

const CreatedUser: React.FC = () => {
  return (
    <div>
      <h2>user Added Successfully</h2>
      <p>Thank you for creating a user!</p>
      <Link to="/mainfeed">Go to Main Feed</Link>
      <Link to="/create-post">Add Your Own Post</Link>
    </div>
  )
}

export default CreatedUser
