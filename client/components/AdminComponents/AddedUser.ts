import React from 'react'
import { Link } from 'react-router-dom'

const AddedUser = () => {
  return (
    <div>
      <h2>User Added Successfully</h2>
      <p>User has been added to the database.</p>
      <Link to="/table/:tableNo/menu">Return to Menu</Link>
      <Link to="/table/:tableNo">Return Home</Link>
    </div>
  )
}

export default AddedUser
