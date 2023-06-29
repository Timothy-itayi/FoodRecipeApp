// PostContainer.tsx
import React, { useState } from 'react'
import UserPosts from './UserPosts'
import MainFeed from './MainFeed'
import { addNewPost } from '../apis/posts'
import { Post } from './types'

const PostContainer: React.FC = () => {
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    description: '',

    image_url: null,
  })

  const handleCreatePost = async () => {
    try {
      const postId = await addNewPost(newPost)
      console.log('New post created:', newPost)
      // Update the state in MainFeed to include the newly added post
      // You can use a state management library like Redux or React Context
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  // Pass the necessary props to UserPosts and MainFeed
  return (
    <div>
      <UserPosts handleCreatePost={handleCreatePost} />
      <MainFeed
        posts={[]}
        handleDeletePost={function (id: number): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}

export default PostContainer
