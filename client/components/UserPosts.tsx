import React, { useState } from 'react'
import superagent from 'superagent'

interface Post {
  id: number
  title: string
  description: string
  user_id: number
  image: File | null
}

const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    description: '',
    user_id: 0,
    image: null,
  })
  const [editPost, setEditPost] = useState<Post | null>(null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value })
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewPost({ ...newPost, description: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const image = files[0]
      setNewPost({ ...newPost, image })
    }
  }

  const handleCreatePost = async () => {
    try {
      const { title, description, image } = newPost

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      if (image) {
        formData.append('image', image)
      }

      const response = await superagent
        .post('/api/posts')
        .send(formData)
        .set('Accept', 'application/json')

      const newPostWithId = { ...response.body, id: response.body.id }

      setPosts([...posts, newPostWithId])
      setNewPost({
        id: 0,
        title: '',
        description: '',
        user_id: 0,
        image: null,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditPost(post)
  }

  const handleUpdatePost = async () => {
    if (editPost) {
      try {
        const { id, title, description, image } = editPost

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        if (image) {
          formData.append('image', image)
        }

        const response = await superagent
          .put(`/api/posts/${id}`)
          .send(formData)
          .set('Accept', 'application/json')

        const updatedPosts = posts.map((post) =>
          post.id === id ? response.body : post
        )

        setPosts(updatedPosts)
        setEditPost(null)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDeletePost = async (id: number) => {
    try {
      await superagent.delete(`/api/posts/${id}`)
      const updatedPosts = posts.filter((post) => post.id !== id)
      setPosts(updatedPosts)
    } catch (error) {
      console.error(error)
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

      <h3>Existing Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
          {post.image && (
            <img src={URL.createObjectURL(post.image)} alt="Post" />
          )}
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setEditPost({ ...editPost, image: e.target.files?.[0] || null })
            }
          />
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}
    </div>
  )
}

export default UserPosts
