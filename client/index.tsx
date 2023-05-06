import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'


import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
  
      <App />
    
  )
})
