import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AuthProvider} from './contexts/AuthContext'
import {ThemeProvider} from './contexts/ThemeContext'
import App from './App.jsx'
import './index.css'

// render App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* authProvider membungkus App agar semua komponen dapat mengakses useAuth() */}
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider> 
    </AuthProvider>
  </StrictMode>,
)
