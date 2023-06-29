import React, { useState, ChangeEvent } from 'react'
import { addNewPost, updatePost, deletePost } from '../apis/posts'
import { Post } from './types'

interface UserPostsProps {
  handleCreatePost: () => void
  handleUpdatePost: () => void
  handleDeletePost: (id: number) => void
}

const UserPosts: React.FC<UserPostsProps> = ({
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
}) => {
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const image = files[0]
      setNewPost({ ...newPost, image_url: URL.createObjectURL(image) })
    }
  }

  const handleCreateButtonClick = async () => {
    try {
      await addNewPost(newPost)
      console.log('new post added successfully', newPost)
      handleCreatePost()
    } catch (error) {
      // Handle error
    }
  }

  const handleDeleteButtonClick = async () => {
    try {
      await deletePost(newPost.id)
      console.log('post deleted successfully', deletePost)
      handleDeletePost(newPost.id)
      setNewPost({
        id: 0,
        title: '',
        description: '',
        user_id: 0,
        image_url: null,
      })
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div>
      <h2>User Posts</h2>

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
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleCreateButtonClick}>Create Post</button>

      <button onClick={handleDeleteButtonClick}>Delete Post</button>
    </div>
  )
}

export default UserPosts
