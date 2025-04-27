import React, { useState } from 'react'
import Button from '../components/ui/Button'
import { base_url } from '../lib/helper'
import { showToast } from '../context/ToastProvider'
import { useNavigate } from 'react-router-dom'


const FindAccount = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate()
    const findAccount = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(base_url + '/auth/find_account', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email })

            })
            const resData = await res.json()
            if (!res.ok || resData.success === false) {
                showToast('error', resData.message)
                return
            }
            console.log(resData)
            setLoading(false)
            showToast('success', resData.message)
            navigate(`/otp_verify?email=${email}&userId=${resData.userId}`)
        } catch (error: any) {
            setError(error.message)
            setLoading(false)
            showToast('error', error.message)
        }
    }

    return (
        <section className='flex justify-center '>
            <form onSubmit={findAccount} className='min-w-lg w-96 max-w-xl bg-white px-4 py-6 rounded-lg shadow-md border flex flex-col gap-3'>
                <h1 className='text-lg font-semibold text-center'>Find your account</h1>
                <input type="email" name='email' value={email} onChange={(e) => (setEmail(e.target.value))} className='py-1.5 px-4 w-full border focus:outline-none bg-gray-50 rounded-lg ' placeholder='your@gmail.com' />
                <Button type="submit" loading={loading} >Find</Button>
                {
                    error && <p className='bg-red-400 p-2 text-sm text-white'>{error}</p>
                }
            </form>


        </section>
    )
}

export default FindAccount