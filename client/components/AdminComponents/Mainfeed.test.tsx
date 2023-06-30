import React from 'react'
import { render } from '@testing-library/react'
import MainFeed from './MainFeed'
import '@testing-library/jest-dom/extend-expect'

const mockPosts = [
  {
    id: 1,
    title: 'Post 1',
    description: 'Description for Post 1',
    image_url: 'https://example.com/post1.jpg',
  },
  {
    id: 2,
    title: 'Post 2',
    description: 'Description for Post 2',
    image_url: 'https://example.com/post2.jpg',
  },
]

test('renders posts with title, image, and description', () => {
  const { getByText, getByAltText } = render(
    <MainFeed posts={mockPosts} handleDeletePost={() => {}} />
  )

  // Check if post titles are rendered
  expect(getByText('Post 1')).toBeInTheDocument()
  expect(getByText('Post 2')).toBeInTheDocument()

  // Check if post descriptions are rendered
  expect(getByText('Description for Post 1')).toBeInTheDocument()
  expect(getByText('Description for Post 2')).toBeInTheDocument()

  // Check if post images are rendered
  expect(getByAltText('Post 1')).toHaveAttribute(
    'src',
    'https://example.com/post1.jpg'
  )
  expect(getByAltText('Post 2')).toHaveAttribute(
    'src',
    'https://example.com/post2.jpg'
  )
})
