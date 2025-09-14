import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ToastProvider from './context/ToastProvider.tsx'
import AuthProvider from './context/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
// import { FetchProvider } from './context/useFetch.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider />
       
          <img src="/assets/white-background.jpg" alt="white background photo"  className='absolute -z-10 inset-0 w-full h-full object-cover'/>

        <App />
     
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>

)
