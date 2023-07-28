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

  // Function to determine if an image is larger
  const isImageLarge = (image_url: string) => {
    // Adjust the threshold as needed based on image sizes
    const thresholdWidth = 400
    const thresholdHeight = 200
    const img = new Image()
    img.src = image_url
    return img.width >= thresholdWidth || img.height >= thresholdHeight
  }

  return (
    <div className="post-container">
      <h1>Post something</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card
                key={blog.id}
                style={{ marginBottom: '15px', height: 'auto' }}
              >
                <CardContent
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ marginBottom: '3px' }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ marginBottom: '3px', flex: 1 }}
                  >
                    {blog.description}
                  </Typography>
                  {blog.image_url && (
                    <div
                      className="card-image"
                      style={{
                        maxHeight: isImageLarge(blog.image_url)
                          ? '150px'
                          : 'auto',
                      }}
                    >
                      <img src={blog.image_url} alt={blog.title} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No blogs to display</p>
          )}
        </>
      )}
    </div>
  )
}

export default PostContainer
