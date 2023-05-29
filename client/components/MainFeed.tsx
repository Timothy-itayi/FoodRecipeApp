import React, { useState } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import Masonry from 'react-masonry-css'

interface Post {
  id: string
  imageUrl: string
  title: string
  description: string
}

const posts: Post[] = [
  {
    id: '1',
    imageUrl: 'pizzabread.jpeg',
    title: 'Pizzabread',
    description:
      'homemade pizza dough, chopped tomatoes , bacon , feta cheese , basil  , seasoned with salt and pepper with a drizzle of oil',
  },
  {
    id: '2',
    imageUrl: 'pancakes.jpeg',
    title: 'Pancakes',
    description:
      'add flour , sugar ,milk , baking powder with a few eggs and mix. leave to rest while you season your pan with oil .',
  },
  {
    id: '3',
    imageUrl: 'flatbread01.jpeg',
    title: 'Veggie Flatbread',
    description:
      'homemade pizza dough, chopped carrots ,onions, seasoned with salt and pepper with a drizzle of oil',
  },
  {
    id: '4',
    imageUrl: 'breadbun.jpeg',
    title: 'Bread Bun',
    description: 'Stuffed bun.',
  },
  // Add more posts here
]

const MainFeed: React.FC = () => {
  const [expandedPost, setExpandedPost] = useState<Post | null>(null)

  const handlePostClick = (post: Post) => {
    setExpandedPost(post)
  }

  const handlePostClose = () => {
    setExpandedPost(null)
  }

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1100: 2,
        700: 1,
      }}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {posts.map((post) => (
        <Card key={post.id} onClick={() => handlePostClick(post)}>
          <CardMedia
            component="img"
            alt={post.title}
            height="300"
            image={post.imageUrl}
          />
          <CardContent>
            <Typography variant="h6" component="h2">
              {post.title}
            </Typography>
          </CardContent>
          {expandedPost?.id === post.id && (
            <CardContent>
              <Typography variant="h6" component="h2">
                {expandedPost.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {expandedPost.description}
              </Typography>
            </CardContent>
          )}
        </Card>
      ))}
    </Masonry>
  )
}

export default MainFeed
