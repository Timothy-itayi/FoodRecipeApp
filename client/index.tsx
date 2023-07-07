import ReactDOM from 'react-dom'
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import App from './App'

interface CustomAuth0ProviderOptions extends Auth0ProviderOptions {
  audience: string
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-kuvlvwpp7p78xckw.au.auth0.com"
    clientId="I9oex4ikfZqEz6Q5WFAKQN8bf9FDQDvL"
    audience="https://dev-kuvlvwpp7p78xckw.au.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('app')
)
