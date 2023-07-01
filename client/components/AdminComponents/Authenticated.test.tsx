import React from 'react'
import { render } from '@testing-library/react'
import { Authenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import '@testing-library/jest-dom/extend-expect'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
  }),
}))

test('checks if user is authenticated', () => {
  const { getByText } = render(
    <Authenticated>
      <div>Authenticated Content</div>
    </Authenticated>
  )

  expect(getByText('Authenticated Content')).toBeInTheDocument()
})
