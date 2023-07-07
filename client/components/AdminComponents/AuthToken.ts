import React, { useEffect } from 'react'

const Auth0 = () => {
  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(
        'https://dev-kuvlvwpp7p78xckw.au.auth0.com/oauth/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'I9oex4ikfZqEz6Q5WFAKQN8bf9FDQDvL',
            client_secret:
              'pakMpN2SvBT90gNYdukZBfUbsRzRHRxor70_KikcG8Ni1h8zikt2Lc5tNT94G7X4',
            audience: 'https://recipe/api',
          }).toString(),
        }
      )

      const { access_token } = await response.json()

      if (access_token) {
        const userData = {
          name: 'John Doe', // Replace with the user data you want to send
          email: 'john.doe@example.com',
        }

        const createUserResponse = await fetch(
          'http://localhost:3000/api/v1/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(userData),
          }
        )

        if (createUserResponse.ok) {
          console.log('User created successfully')
        } else {
          console.error('Error creating user:', createUserResponse.statusText)
        }
      }
    }

    getToken()
  }, [])

  return null
}

export default Auth0
