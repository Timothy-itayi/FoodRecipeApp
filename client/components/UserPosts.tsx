import React, { useState } from 'react'

interface Post {
  id: number
  title: string
  description: string
  user_id: number
}

const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    description: '',
    user_id: 0,
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

  const handleCreatePost = () => {
    // Generate a unique ID for the new post
    const newId = Math.max(0, ...posts.map((post) => post.id)) + 1
    const newPostWithId = { ...newPost, id: newId }

    setPosts([...posts, newPostWithId])
    setNewPost({ id: 0, title: '', description: '', user_id: 0 })
  }

  const handleEditPost = (post: Post) => {
    setEditPost(post)
  }

  const handleUpdatePost = () => {
    if (editPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editPost.id ? editPost : post
      )

      setPosts(updatedPosts)
      setEditPost(null)
    }
  }

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
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
      <button onClick={handleCreatePost}>Create Post</button>

      <h3>Existing Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
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
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}
    </div>
  )
}

export default UserPosts
