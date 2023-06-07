import React, { useState, ChangeEvent } from 'react'
import { addNewPost, updatePost, deletePost } from '../apis/posts'
import { Post } from './types'

interface UserPostsProps {
  handleCreatePost: () => void
  handleUpdatePost: () => void
  handleDeletePost: (id: number) => void
  handleEditPost: (post: Post) => void
}

const UserPosts: React.FC<UserPostsProps> = ({
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
  handleEditPost,
}) => {
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    description: '',
    user_id: 0,
    image_url: null,
  })
  const [editPost, setEditPost] = useState<Post | null>(null)

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
      <button onClick={handleCreatePost}>Create Post</button>

      {editPost && (
        <div>
          <h3>
            <button onClick={() => setEditPost(null)}>Back</button> Edit Post
          </h3>
          <input
            type="text"
            value={editPost.title}
            onChange={(e) =>
              setEditPost({ ...editPost, title: e.target.value })
            }
          />
          <textarea
            value={editPost.description}
            onChange={(e) =>
              setEditPost({ ...editPost, description: e.target.value })
            }
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}
    </div>
  )
}

export default UserPosts
