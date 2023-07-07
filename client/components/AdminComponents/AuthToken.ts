import React, { useEffect } from 'react'

const Auth0 = () => {
  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(
          'https://dev-kuvlvwpp7p78xckw.au.auth0.com/oauth/token',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'client_credentials',
              client_id: process.env.CLIENT_ID as string, // Use environment variable or retrieve securely
              client_secret: process.env.CLIENT_SECRET as string, // Use environment variable or retrieve securely
              audience: 'https://recipe/api',
            }).toString(),
          }
        )

        const data = await response.json()
        if (response.ok) {
          const { access_token } = data
          console.log('Access Token:', access_token)

          const userData = {
            username: 'John Doe', // Replace with the user data you want to send
            user_email: 'john.doe@example.com',
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
        } else {
          console.error('Token retrieval failed:', data)
        }
      } catch (error) {
        console.error('Error occurred during token retrieval:', error)
      }
    }

    getToken()
  }, [])

  return null
}

export default Auth0
