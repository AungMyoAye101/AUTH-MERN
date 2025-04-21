import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { base_url } from "../pages/Signup"

const userContext = createContext(null)
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState()
    console.log(user)
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
                setUser(null)
            }
            const resData = await res.json()
            console.log(resData)
            setUser(resData)
        } catch (error) {
            console.log(error)
            setUser(null)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <userContext.Provider value={{ user }}>{children}</userContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}

export default AuthProvider