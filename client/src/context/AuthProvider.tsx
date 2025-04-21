import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { base_url } from "../pages/Signup"

type AuthContextType = {
    id: string,
    name: string,
    email: string,
    isVerified: boolean
}

const defaultAuth: AuthContextType = {
    id: '',
    name: '',
    email: '',
    isVerified: false
}


const userContext = createContext<AuthContextType>(defaultAuth)
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthContextType>(defaultAuth)
    const fetchUser = async () => {
        try {
            const res = await fetch(base_url + 'auth/me', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'

            })
            if (!res.ok) {
                setUser(defaultAuth)
            }
            const { user } = await res.json()
            console.log(user)
            setUser({
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            })
        } catch (error) {
            console.log(error)
            setUser(defaultAuth)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <userContext.Provider value={user}>{children}</userContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}

export default AuthProvider