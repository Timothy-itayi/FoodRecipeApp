import React from 'react'
import { render } from '@testing-library/react'
import PostContainer from './PostContainer'
import '@testing-library/jest-dom/extend-expect'

test('renders UserPosts and MainFeed components', () => {
  const { getByText } = render(<PostContainer />)

  // Check if UserPosts component is rendered
  expect(getByText('Add Post')).toBeInTheDocument()

  // Check if MainFeed component is rendered
  expect(getByText('Posts')).toBeInTheDocument()
})
