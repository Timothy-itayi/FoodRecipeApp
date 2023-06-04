import React, { useState, ChangeEvent } from 'react'
import { addNewPost, updatePost, deletePost } from '../apis/posts'

interface Post {
  id: number
  title: string
  description: string
  user_id: number
  image_url: string | null
}

const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
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

  const handleCreatePost = async () => {
    try {
      const { title, description, image_url } = newPost

      const newPostId = await addNewPost({ title, description, image_url })

      const newPostWithId = { ...newPost, id: newPostId }

      setPosts([newPostWithId])
      setNewPost({
        id: 0,
        title: '',
        description: '',
        user_id: 0,
        image_url: null,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdatePost = async () => {
    if (editPost) {
      try {
        const { id, title, description, image_url } = editPost

        await updatePost(id, { title, description, image_url })

        setPosts([editPost])
        setEditPost(null)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      setPosts([])
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditPost(post)
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

      <h3>Existing Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
          {post.image_url && <img src={post.image_url} alt="Post" />}
          <button onClick={() => handleEditPost(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}

      {editPost && (
        <div>
          <h3>Edit Post</h3>
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
