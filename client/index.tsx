import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="dev-kuvlvwpp7p78xckw.au.auth0.com"
      clientId="I9oex4ikfZqEz6Q5WFAKQN8bf9FDQDvL"
      redirectUri={window.location.origin}
      audience="https://recipe/api"
    >
      <App />
    </Auth0Provider>
  )
})
