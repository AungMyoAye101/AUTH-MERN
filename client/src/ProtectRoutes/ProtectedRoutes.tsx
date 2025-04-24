import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { id } = useAuth()
    return id ? children : <Navigate to={'/login'} />
}

export default ProtectedRoutes