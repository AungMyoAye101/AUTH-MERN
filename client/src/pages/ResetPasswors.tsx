import { useEffect, useState } from 'react'

import FormController from '../components/ui/FormController'
import { useAuth } from '../context/AuthProvider'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { base_url } from '../lib/helper'
import { showToast } from '../context/ToastProvider'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'


const password = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long.").regex(/[A-Z]/, "Password must include one uppercase letter").regex(/\d/, "Password must include one number")
})
type Password = z.infer<typeof password>
const ResetPassword = () => {
    const { fetchUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(password),

    })
    useEffect(() => {
        fetchUser()
    }, [])

    const submitHandle = async (data: Password) => {

        setLoading(true)
        try {
            const res = await fetch(base_url + "/auth/reset_password", {
                method: "POST",
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            const response = await res.json()
            if (!res.ok || response.success === false) {
                setError(response.message)
                showToast("error", response.message)

                return
            }
            showToast("success", response.message)
            navigate('/')
        } catch (error) {
            setLoading(false)
            if (error instanceof Error) {
                setError(error.message)
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='container'>
            <form onSubmit={handleSubmit(submitHandle)} className='form_container'>
                <h1 className='text-xl md:text-2xl font-bold text-center text-neutral-700'>Reset Password</h1>
                <FormController type='password' icon='/assets/key.svg' name='password' register={register} error={errors.password} placeholder='Enter new password' />
                <Button type='submit' loading={loading}>Submit</Button>
                {
                    error && <p className='error_message'>{error}</p>
                }
            </form>
        </section>
    )
}

export default ResetPassword