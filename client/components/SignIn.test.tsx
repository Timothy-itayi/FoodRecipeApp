import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useAuth0 } from '@auth0/auth0-react'
import SignIn from '../components/SignIn'

jest.mock('@auth0/auth0-react')

test('clicking sign-in button calls loginWithRedirect', () => {
  const loginWithRedirect = jest.fn()

  ;(useAuth0 as jest.Mock).mockReturnValue({
    loginWithRedirect,
  })

  const { getByText } = render(<SignIn />)
  const signInButton = getByText('Sign in with Google')
  fireEvent.click(signInButton)

  expect(loginWithRedirect).toHaveBeenCalledTimes(1)
})
