import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AuthProvider} from './contexts/AuthContext'
import App from './App.jsx'
import './index.css'

// render App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* authProvider membungkus App agar semua komponen dapat mengakses useAuth() */}
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>,
)
