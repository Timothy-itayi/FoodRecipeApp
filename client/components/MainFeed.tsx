import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Post } from './types'

interface MainFeedProps {
  posts: Post[]
  handleDeletePost: (id: number) => void
}

const MainFeed: React.FC<MainFeedProps> = ({ posts, handleDeletePost }) => {
  console.log('MainFeed Component - posts:', posts)

  if (posts.length === 0) {
    console.log('MainFeed Component - No posts found')
    return <p>Posts</p>
  }

  console.log('MainFeed Component - Rendering posts:', posts)

  return (
    <div>
      {posts.map((post) => (
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
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>{' '}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MainFeed
