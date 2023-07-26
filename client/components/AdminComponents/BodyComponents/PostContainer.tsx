import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { getAllPosts } from '../../../apis/posts'
import { Post } from '../../types'
interface PostContainerProps {
  post: Post[]
}
const PostContainer: React.FC<PostContainerProps> = ({ post: propPosts }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getAllPosts()
        console.log('Fetched Data:', response)

        if (response && Array.isArray(response.posts)) {
          setPosts(response.posts)
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

  console.log('State Data:', posts)
  console.log('Is posts an array?', Array.isArray(posts))

  return (
    <>
      <h1>Post something</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ marginBottom: '10px' }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '10px' }}>
                    {post.description}
                  </Typography>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      style={{
                        marginBottom: '10px',
                        maxWidth: '100%',
                        height: 'auto',
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
