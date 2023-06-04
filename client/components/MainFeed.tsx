import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Post } from './types'

interface MainFeedProps {
  posts: Post[]
}

const MainFeed: React.FC<MainFeedProps> = ({ posts }) => {
  console.log('MainFeed Component - posts:', posts) // Check the value of posts prop

  if (posts.length === 0) {
    console.log('MainFeed Component - No posts found') // Log when no posts are found
    return <p>No posts found.</p>
  }

  console.log('MainFeed Component - Rendering posts:', posts) // Log when rendering posts

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {post.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MainFeed
