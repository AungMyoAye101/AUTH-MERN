
import { useState } from 'react'
import { base_url, loginData } from '../lib/helper'
import FormController from '../components/ui/FormController'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { showToast } from '../context/ToastProvider'


const loginSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(6, "Password must be at least 6 characters long.").regex(/[A-Z]/, "Password must include one Uppercase letter").regex(/\d/, "Password must include one number.")
})

type LoginType = z.infer<typeof loginSchema>

const Login = () => {


    const [error, setError] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target
    //     setData((pre) => ({ ...pre, [name]: value }))
    // }

    const onSubmit = async (data: LoginType) => {
        console.log("click")
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
            console.log(response)
            if (response.success === false) {
                setError(response.message)
                showToast("error", response.message)
                return
            }
        } catch (err: any) {
            console.log(err)
            if (err.response.data.errors) {
                setError(err.response.data.errors[0].msg)
            } else if (err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("Failed to login")
            }
        }

    }

    return (
        <section className='container'>

            {/* <Form headingText='Login' method='POST' endpoint={'/auth/login'} data={data} setError={setError} redirect='/' error={error}>
                <h2 className="text-base md:text-lg font-medium font-serif text-center text-neutral-700">Please login your account</h2>
                {
                    loginData.map((field, i) => (<FormController key={i} type={field.type} name={field.name} id={field.name} placeholder={field.placeholder} onChange={handleChange} icon={field.icon} />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <Link to={'/find_account'} className='link_text'>Forgot password?</Link>
                    <Link to={'/signup'} className='link_text'>Sign up</Link>
                </div>

            </Form> */}
            <form onSubmit={handleSubmit(onSubmit)} className="min-w-lg w-96 max-w-xl bg-neutral-100 px-4 py-6 rounded-lg shadow-md border flex flex-col gap-3">
                {
                    loginData.map(field => (
                        <FormController name={field.name} key={field.id} icon={field.icon} register={register} placeholder={field.placeholder} type={field.type} error={errors[field.name as keyof LoginType]} />
                    ))
                }
                <button type='submit'>Submit</button>
                {

                    error && <p className='text-sm bg-red-400 text-white p-2 rounded-full text-center'>{error}</p>

                }
            </form>
        </section>
    )
}

export default Login