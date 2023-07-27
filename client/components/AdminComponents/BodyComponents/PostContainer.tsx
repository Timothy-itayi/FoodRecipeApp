import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { getAllPosts } from '../../../apis/posts'
import { Post } from '../../types'
interface PostContainerProps {
  posts: Post[]
}

const PostContainer: React.FC<PostContainerProps> = () => {
  const [blogs, setBlogs] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getAllPosts()
        console.log('Fetched Data:', response)

        if (response && Array.isArray(response)) {
          setBlogs(response) // Use setBlogs instead of setPosts
        } else {
          setError('Invalid response format')
        }

        setLoading(false)
      } catch (error) {
        setError('Error fetching data')
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
  }, [])

  // console.log('State Data:', blogs) // Use blogs instead of posts
  // console.log('Is blogs an array?', Array.isArray(blogs)) // Use blogs instead of posts

  return (
    <>
      <h1>Post something</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card key={blog.id} style={{ marginBottom: '3px' }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ marginBottom: '3px' }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '3px' }}>
                    {blog.description}
                  </Typography>
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      style={{
                        marginBottom: '3px',
                        maxWidth: '100%',
                        height: '50',
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      )}
    </>
  )
}

export default PostContainer
