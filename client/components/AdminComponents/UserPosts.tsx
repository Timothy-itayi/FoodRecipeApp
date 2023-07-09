import React, { useState, ChangeEvent } from 'react'
import { addNewPost, updatePost, deletePost } from '../../apis/posts'
import { Post } from '../types'

interface UserPostsProps {
  handleCreatePost: () => void
  userId: number
}

const UserPosts: React.FC<UserPostsProps> = ({ handleCreatePost, userId }) => {
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    description: '',
    user_id: 0,
    image_url: null,
  })

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value })
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, description: e.target.value })
  }

  const handleCreateButtonClick = async () => {
    try {
      const newPostWithUserId = { ...newPost, user_id: userId }
      const newPostId = await addNewPost(newPostWithUserId)
      console.log('New post added successfully. postId:', newPostId) // Log the newPostId

      handleCreatePost()
    } catch (error) {
      console.error('Error adding new post:', error)
    }
  }

  return (
    <div>
      <h3>Create a New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={handleTitleChange}
      />
      <textarea
        placeholder="Description"
        value={newPost.description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleCreateButtonClick}>Create Post</button>
    </div>
  )
}

export default UserPosts
