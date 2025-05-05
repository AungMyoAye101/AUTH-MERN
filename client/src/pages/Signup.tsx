
import { base_url, signupData } from '../lib/helper'
import { Link, useNavigate } from 'react-router-dom'
import FormController from '../components/ui/FormController'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showToast } from '../context/ToastProvider'
import Button from '../components/ui/Button'



const signupSchema = z.object({
    name: z.string().min(1, "Name must be at least one character"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters").regex(/[A-Z]/, "Password must contain one uppercase letter").regex(/\d/, "Password must contain one number.")
})

type SignupType = z.infer<typeof signupSchema>

const Signup = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    })

    const submitHandle = async (data: SignupType) => {

        setLoading(true)
        try {
            const res = await fetch(base_url + '/auth/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
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

            showToast('success', response.message)
            navigate('/')

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

            <form onSubmit={handleSubmit(submitHandle)} className='form_container'>
                <h2 className="text-base md:text-lg font-medium font-serif text-center text-neutral-700">Please create an account</h2>
                {
                    signupData.map(field => <FormController label={field.label} name={field.name} key={field.id} icon={field.icon} register={register} placeholder={field.placeholder} type={field.type} error={errors[field.name as keyof SignupType]} />)
                }
                <div className='flex justify-between items-center gap-2 '>
                    <p className='link_text hover:text-neutral-700'>Already have an account</p>
                    <Link to={'/login'} className='link_text'>Login</Link>
                </div>
                <Button type='submit' loading={loading}>Submit</Button>
                {
                    error && <p className='error_message'>{error}</p>
                }
            </form>
        </section>
    )
}

export default Signup