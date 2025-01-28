import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Classwork from './Classwork.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Test</h1>
    <App />
    <h1>Class Work</h1>
    <Classwork />
    
  </StrictMode>,
)
