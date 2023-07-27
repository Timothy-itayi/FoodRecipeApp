import React, { useState, ChangeEvent } from 'react'
import { addNewPost } from '../../../apis/posts'
import { CustomUser, Post } from '../../types'

interface UserPostsProps {
  handleCreatePost: (newPostWithUserId: Post) => void
  user: CustomUser // Use the CustomUser type instead of User
  posts: Post[]
}

const UserPosts: React.FC<UserPostsProps> = ({
  handleCreatePost,
  user,
  posts,
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

  const handleCreateButtonClick = async () => {
    try {
      const newPostWithUserId = { ...newPost, user_id: user.id } // Assuming user.id is the user's unique identifier
      const newPostId = await addNewPost(newPostWithUserId)
      console.log(
        'New post added successfully. newPostwithUserId:',
        newPostWithUserId
      )

      handleCreatePost(newPostWithUserId)
      setNewPost({
        id: 0,
        title: '',
        description: '',
        user_id: 0,
        image_url: null,
      })
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
