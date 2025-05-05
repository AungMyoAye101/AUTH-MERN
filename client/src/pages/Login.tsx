
import { useState } from 'react'
import { base_url, loginData } from '../lib/helper'
import FormController from '../components/ui/FormController'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { showToast } from '../context/ToastProvider'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import Button from '../components/ui/Button'


const loginSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(6, "Password must be at least 6 characters long.").regex(/[A-Z]/, "Password must include one Uppercase letter").regex(/\d/, "Password must include one number.")
})

type LoginType = z.infer<typeof loginSchema>

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('') //errors from server
    const navigate = useNavigate()
    const { fetchUser } = useAuth()

    //react useform 
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })
    const onSubmit = async (data: LoginType) => {
        setLoading(true)
        try {
            const res = await fetch(base_url + "/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            const response = await res.json()

            if (response.success === false) {
                setError(response.message)
                showToast("error", response.message)

                return
            }
            showToast("success", response.message)
            fetchUser()
            navigate("/")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }

    }

    return (
        <section className='container'>
            <form onSubmit={handleSubmit(onSubmit)} className="form_container">
                <div>

                    <h1 className='text-xl md:text-2xl font-bold text-center text-neutral-700'>Login</h1>
                    <h2 className='text-base md:text-lg font-semibold text-center text-neutral-700'>Please login your account</h2>
                </div>
                {
                    loginData.map(field => (
                        <FormController name={field.name} key={field.id} icon={field.icon} register={register} placeholder={field.placeholder} label={field.label} type={field.type} error={errors[field.name as keyof LoginType]} />
                    ))
                }
                <div className='flex justify-between items-center text-xs font-serif text-neutral-600 '><Link to={'/find_account'} className='hover:text-purple-400'>Forget password?</Link> <Link to={'/signup'} className='hover:text-purple-400'>Signup</Link></div>
                <Button type='submit' loading={loading}>Submit</Button>
                <Link to={'/account-appeal'} className='text-xs font-serif text-center hover:text-purple-400'>If your account was banned . Please contact us for appeal.</Link>
                {

                    error && <p className='error_message'>{error}</p>

                }
            </form>
        </section>
    )
}

export default Login