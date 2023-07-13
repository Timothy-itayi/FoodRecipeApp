import React, { SetStateAction, useState } from 'react'
import UserPosts from './UserPosts'
import MainFeed from './MainFeed'
import { addNewPost } from '../../../apis/posts'
import { Post } from '../../types'
import PostFetcher from './PostFetcher'

const PostContainer: React.FC = () => {
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    description: '',
    user_id: 0,
    image_url: null,
  })

  const handleCreatePost = async () => {
    try {
      const postId = await addNewPost(newPost)
      console.log('New post created:', newPost)

      setNewPost({
        id: 0,
        title: '',
        description: '',
        user_id: 0,
        image_url: null,
      })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const [posts, setPosts] = useState<Post[]>([])

  return (
    <div>
      <PostFetcher setPostsData={setPosts} />
      <UserPosts handleCreatePost={handleCreatePost} userId={0} posts={posts} />
      <MainFeed posts={posts} />
    </div>
  )
}

export default PostContainer
