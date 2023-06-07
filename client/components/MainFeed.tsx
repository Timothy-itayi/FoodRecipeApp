import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { Post } from './types'

interface MainFeedProps {
  posts: Post[]
}

const MainFeed: React.FC<MainFeedProps> = ({ posts }) => {
  console.log('MainFeed Component - posts:', posts)

  if (posts.length === 0) {
    console.log('MainFeed Component - No posts found')
    return <p>No posts found.</p>
  }

  console.log('MainFeed Component - Rendering posts:', posts)

  return (
    <div>
      {posts.map((post) => (
        <Accordion key={post.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="h2">
              {post.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent>
              <Typography variant="body1">{post.description}</Typography>
              {post.image_url && <img src={post.image_url} alt={post.title} />}
            </CardContent>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default MainFeed
