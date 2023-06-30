import React from 'react'
import { render, waitFor } from '@testing-library/react'
import PostFetcher from './PostFetcher'
import '@testing-library/jest-dom/extend-expect'

test('fetches and validates posts data', async () => {
  const setPostsData = jest.fn()

  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce({
      posts: [{ id: 1, title: 'Post 1' }],
    }),
  })

  render(<PostFetcher setPostsData={setPostsData} />)

  await waitFor(() =>
    expect(setPostsData).toHaveBeenCalledWith([{ id: 1, title: 'Post 1' }])
  )
})
