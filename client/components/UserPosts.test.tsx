import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import UserPosts from './UserPosts'

test('updates title and description inputs correctly', () => {
  render(<UserPosts handleCreatePost={() => {}} />)

  const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement
  const descriptionInput = screen.getByPlaceholderText(
    'Description'
  ) as HTMLTextAreaElement

  fireEvent.change(titleInput, { target: { value: 'Test Title' } })
  fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })

  expect(titleInput.value).toBe('Test Title')
  expect(descriptionInput.value).toBe('Test Description')
})
