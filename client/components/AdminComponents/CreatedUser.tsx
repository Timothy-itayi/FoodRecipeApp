import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MainFeed from './MainFeed'
import UserPosts from './UserPosts'

interface CreatedUserProps {
  isAuthenticated: boolean
}

const CreatedUser: React.FC<CreatedUserProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div>
      {/* Render any other content for the CreatedUser component here */}
      <Routes>
        <Route
          path="/"
          element={
            <MainFeed
              posts={[]}
              handleDeletePost={function (id: number): void {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
        <Route
          path="/userposts"
          element={
            <UserPosts
              handleCreatePost={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default CreatedUser
