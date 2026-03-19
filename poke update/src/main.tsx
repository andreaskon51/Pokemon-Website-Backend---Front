import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { PortfolioProvider } from './contexts/PortfolioContext'
import App from './App'
import AuthModal from './components/auth/AuthModal'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PortfolioProvider>
          <ToastProvider>
            <App />
            <AuthModal />
          </ToastProvider>
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
