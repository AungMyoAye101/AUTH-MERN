import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { showToast } from "./ToastProvider"
import { base_url } from "../lib/helper"


type UserType = {
    id: string | undefined,
    name: string,
    email: string,
    isVerified: boolean,
    isAdmin: boolean
}
type AuthContextProp = UserType & {
    logout: () => void
    fetchUser: () => void
}
const defaultUser: UserType = {
    id: '',
    name: '',
    email: '',
    isVerified: false,
    isAdmin: false
}


const userContext = createContext<AuthContextProp>({
    ...defaultUser,
    logout: () => { },
    fetchUser: () => { }
}
)
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>(defaultUser)

    const fetchUser = async () => {
        try {
            const res = await fetch(base_url + '/auth/me', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'

            })
            if (!res.ok) {
                setUser(defaultUser)
                return
            }
            const { user } = await res.json()
            setUser({
                id: user?._id,
                name: user?.name,
                email: user?.email,
                isVerified: user?.isVerified,
                isAdmin: user?.isAdmin
            })
        } catch (error) {
            console.log(error)
            setUser(defaultUser)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])



    const logout = async () => {
        try {
            const res = await fetch(base_url + '/auth/logout', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok) {
                showToast("error", data.message)
                throw new Error("Failed to logout")
            }
            setUser(defaultUser)
            showToast("", data.message)

        } catch (error: any) {
            showToast("error", error.message)
            console.log(error)
        }
    }



    return (
        <userContext.Provider value={{ id: user?.id, name: user?.name, email: user?.email, isVerified: user?.isVerified, isAdmin: user?.isAdmin, logout, fetchUser }}>{children}</userContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}

export default AuthProvider