
import React, { useState } from "react"
import Button from "./Button"
import { showToast } from "../../context/ToastProvider"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import { base_url } from "../../lib/helper"
type FormPropsTypes = {
    endpoint: string,
    data: any,
    children: React.ReactNode,
    headingText: string,
    setError: any,
    redirect: string,
    method: "POST" | "PUT",
    error: string
}

const Form = ({ children, method, endpoint, headingText, data, setError, redirect, error }: FormPropsTypes) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { fetchUser } = useAuth()
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(base_url + endpoint, {
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"

            })
            const resData = await res.json()
            console.log(resData)
            setLoading(false)
            if (!res.ok || resData.success === false) {
                const errorMessage = Array.isArray(resData.message) ? resData.message[0]?.msg : resData.message;
                showToast('error', errorMessage);
                setError(errorMessage);
                return
            }
            fetchUser()
            showToast('success', resData.message)
            navigate(redirect.startsWith('/') ? redirect : '/' + redirect)
        } catch (error: any) {
            setLoading(false)
            showToast('error', error.message)
            setError(error.message)
        }
    }
    const spinner = <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent bg-transparent animate-spin"></div>
    return (
        <form onSubmit={onSubmit} className="min-w-lg w-96 max-w-xl bg-neutral-50 px-4 py-6 rounded-lg shadow-md border flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-center font-serif text-neutral-800">{headingText}</h1>

            {children}
            <Button type="submit" className="bg-blue-200 text-white h-10 flex items-center justify-center">{loading ? spinner : 'Submit'}</Button>

            {


                error && <p className="bg-red-400 text-sm font-serif p-2 rounded-full text-center text-white">{error}</p>

            }
        </form>
    )
}

export default Form