import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { showToast } from "./ToastProvider"
import { base_url } from "../lib/helper"

type UserType = {
    id: string | undefined,
    name: string,
    email: string,
    isVerified: boolean
}
type AuthContextProp = UserType & {
    logout: () => void
    fetchUser: () => void
}
const defaultUser: UserType = {
    id: '',
    name: '',
    email: '',
    isVerified: false
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
            console.log(user)
            setUser({
                id: user?._id,
                name: user?.name,
                email: user?.email,
                isVerified: user?.isVerified
            })
        } catch (error) {
            console.log(error)
            setUser(defaultUser)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // const onSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     try {
    //         setLoading(true)
    //         const res = await fetch(base_url + endpoint, {
    //             method,
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify(data),
    //             credentials: "include"

    //         })
    //         const resData = await res.json()
    //         setLoading(false)
    //         if (!res.ok || resData.success === false) {
    //             showToast('error', resData.message)
    //             setError(resData.message)
    //             return
    //         }
    //         fetchUser()
    //         showToast('success', resData.message)
    //         navigate(redirect.startsWith('/') ? redirect : '/' + redirect)
    //     } catch (error: any) {
    //         setLoading(false)
    //         showToast('error', error.message)
    //         setError(error.message)
    //     }
    // }



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
            showToast("success", data.message)
        } catch (error: any) {
            showToast("error", error.message)
            console.log(error)
        }
    }



    return (
        <userContext.Provider value={{ id: user?.id, name: user?.name, email: user?.email, isVerified: user?.isVerified, logout, fetchUser }}>{children}</userContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}

export default AuthProvider