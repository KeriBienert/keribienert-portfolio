import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import KeriBienertPortfolio from './KeriBienertPortfolio.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <App />
    <KeriBienertPortfolio /> 
  </StrictMode>,
)
=======
    <App />  {/* Only render App */}
  </StrictMode>
)
>>>>>>> a7e4d96 (Updated portfolio  with latest changes)
