import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

//css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//js bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//css index
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
