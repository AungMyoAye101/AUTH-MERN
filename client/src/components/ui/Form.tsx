
import React, { useState } from "react"
import Button from "./Button"
import { showToast } from "../../context/ToastProvider"
import { useNavigate } from "react-router-dom"
import { base_url } from "../../pages/Signup"
type FormPropsTypes = {
    endpoint: string,
    data: any,
    children: React.ReactNode,
    headingText: string,
    setError: any,
    redirect: string,
    method: "POST" | "PUT"
}

const Form = ({ children, method, endpoint, headingText, data, setError, redirect }: FormPropsTypes) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
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
            setLoading(false)
            if (!res.ok || resData.success === false) {
                showToast('error', resData.message)
                setError(resData.message)
                return
            }
            showToast('success', resData.message)
            navigate(redirect.startsWith('/') ? redirect : '/' + redirect)
        } catch (error: any) {
            setLoading(false)
            showToast('error', error.message)
            setError(error.message)
        }
    }
    const spinner = <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent bg-transparent animate-spin"></div>
    return (
        <form onSubmit={onSubmit} className="min-w-lg w-96 max-w-xl bg-white px-4 py-6 rounded-lg shadow-md border flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-center font-serif">{headingText}</h1>
            {children}
            <Button type="submit" className="bg-blue-200 h-10 flex items-center justify-center">{loading ? spinner : 'submit'}</Button>
        </form>
    )
}

export default Form