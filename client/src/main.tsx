import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ToastProvider from './context/ToastProvider.tsx'
import AuthProvider from './context/AuthProvider.tsx'
// import { FetchProvider } from './context/useFetch.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider />
      <App />
    </AuthProvider>

  </StrictMode>,
)
