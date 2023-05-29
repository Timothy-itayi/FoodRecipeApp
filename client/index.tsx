import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="dev-kuvlvwpp7p78xckw.au.auth0.com"
      clientId="I9oex4ikfZqEz6Q5WFAKQN8bf9FDQDvL"
      redirectUri={window.location.origin}
      audience="https://recipe/api"
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
