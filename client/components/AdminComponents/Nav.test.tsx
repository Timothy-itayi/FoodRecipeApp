import { render, screen, fireEvent } from '@testing-library/react'
import { Auth0Provider } from '@auth0/auth0-react'
import Nav from './Nav'

test('renders sign in button when user is not authenticated', () => {
  render(<Nav isAuthenticated={false} userName={''} />)

  const signInButton = screen.getByRole('button', {
    name: 'Sign in',
  }) as HTMLButtonElement
  expect(signInButton).toBeTruthy()
})
