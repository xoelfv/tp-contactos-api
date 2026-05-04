import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //StrictMode es para depuraciones, ejecuta dos veces la llamada
  <StrictMode> 
    <App />
  </StrictMode>,
)
