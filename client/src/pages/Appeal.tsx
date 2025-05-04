import { useState } from 'react'
import FormController from '../components/ui/FormController'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../components/ui/Button'
import { base_url } from '../lib/helper'
import { showToast } from '../context/ToastProvider'
import { useNavigate } from 'react-router-dom'


const appealSchema = z.object({
    email: z.string().email("Invalid email"),
    about: z.string().min(12, "About contain at least 12 characters.")
})
type AppealType = z.infer<typeof appealSchema>
const Appeal = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(appealSchema)
    })
    const submitHandle = async (data: AppealType) => {
        setLoading(true)
        try {
            const res = await fetch(base_url + "/account/appeal", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (!res.ok || response.sucess === false) {
                setError(response.message)
                showToast("error", response.message)
                return
            }
            showToast("success", response.message)
            navigate('/login')
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <section onSubmit={handleSubmit(submitHandle)} className='container'>
            <form className='form_container'>
                <h1 className='text-2xl md:text-4xl font-serif font-bold text-neutral-700'>Account Appeal</h1>
                <FormController type='email' name='email' register={register} error={errors.email} icon='/assets/mail.svg' placeholder='example@gmail.com' />
                <div className='flex flex-col'>

                    <textarea {...register('about')} placeholder='Please write your reason' className='py-1 px-4 text-sm bg-neutral-200 rounded-xl focus:outline-none min-h-20' />
                    {errors.about && <span className='text-sm text-red-400 font-serif'>{errors.about.message}</span>}
                </div>
                <Button type='submit' loading={loading}>submit</Button>
                {
                    error && <p className='p-2 rounded-full text-center bg-red-400 text-white text-sm font-serif'>{error}</p>
                }
            </form>

        </section>
    )
}

export default Appeal