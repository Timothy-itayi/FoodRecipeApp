import { render, screen, fireEvent } from '@testing-library/react'
import Nav from './Nav'
import '@testing-library/jest-dom/extend-expect'

test('renders sign out button when user is authenticated', () => {
  render(<Nav isAuthenticated={true} userName="tim itayi" />)

  const signOutButton = screen.getByRole('button', { name: 'Sign out' })
  expect(signOutButton).toBeInTheDocument()

  fireEvent.click(signOutButton) // Simulate clicking the sign out button
})

test('displays user name when user is authenticated', () => {
  const userName = 'tim itayi'
  render(<Nav isAuthenticated={true} userName={userName} />)

  const userNameElement = screen.getByText(`Signed in as: ${userName}`)
  expect(userNameElement).toBeInTheDocument()
})

test('renders sign in button when user is not authenticated', () => {
  render(<Nav isAuthenticated={false} userName={''} />)

  const signInButton = screen.getByRole('button', { name: 'Sign in' })
  expect(signInButton).toBeInTheDocument()
})
