import React from 'react'

function CreateProfile() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Profile</h2>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" required />
      <label htmlFor="bio">Bio:</label>
      <textarea id="bio" name="bio" required />
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateProfile
