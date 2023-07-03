import React from 'react'
import { render } from '@testing-library/react'
import PostContainer from './PostContainer'

test('renders UserPosts and MainFeed components', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Post 1',
      description: 'Description 1',
      image_url: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Post 2',
      description: 'Description 2',
      image_url: 'https://example.com/image2.jpg',
    },
  ]

  const { queryByText } = render(<PostContainer />)

  // Check if UserPosts component is rendered
  // Check if UserPosts component is rendered
  const createButton = queryByText('Create Post')
  expect(createButton).toBeTruthy()

  // Check if MainFeed component is rendered
  const postsText = queryByText('Posts')
  expect(postsText).toBeTruthy()
})
