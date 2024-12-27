import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AsyncAPIExample from './COMPONENTS/AsyncBank.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,

  // <StrictMode>
  //   <AsyncAPIExample />
  // </StrictMode>,
)
