
import { useState } from 'react'
import { loginData } from '../assets/lib/helper'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { Link, useNavigate } from 'react-router-dom'
import { base_url } from './Signup'
import { showToast } from '../context/ToastProvider'

const Login = () => {
    const [data, setData] = useState({
        name: '',
        email: "",
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((pre) => ({ ...pre, [name]: value }))
    }
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(base_url + '/api/v1/auth/login', {
                method: "POST",
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
            navigate('/dashboard')
        } catch (error: any) {
            setLoading(false)
            showToast('success', error.message)
            setError(error.message)
        }
    }
    return (
        <section className='flex justify-center items-center  p-4'>

            <Form headingText='Login' onSubmit={onSubmit} loading={loading}>
                {
                    loginData.map((data, i) => (<FormController key={i} type={data.type} name={data.name} id={data.name} placeholder={data.placeholder} onChange={handleChange} style="bg-white" />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <Link to={'/'} className='link_text'>Forgot password?</Link>
                    <Link to={'/signup'} className='link_text'>Sign up</Link>
                </div>
                {
                    error && <div className='text-red-400'>{error}</div>
                }
            </Form>
        </section>
    )
}

export default Login