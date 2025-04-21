
import { signupData } from '../assets/lib/helper'
import Form from '../components/ui/Form'
import { Link, useNavigate } from 'react-router-dom'
import FormController from '../components/ui/FormController'
import { useState } from 'react'


export const base_url = import.meta.env.VITE_BASE_URL

const Signup = () => {
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
            const res = await fetch(base_url + '/api/v1/auth/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"

            })

            const resData = await res.json()
            console.log(resData)
            setLoading(false)
            navigate('/')
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
        }
    }



    return (
        <section className='flex justify-center items-center  p-4'>

            <Form headingText='Signup' onSubmit={onSubmit} loading={loading}>
                {
                    signupData.map((data, i) => (<FormController key={i} type={data.type} name={data.name} id={data.name} placeholder={data.placeholder} onChange={(e) => handleChange(e)} style="bg-white" />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <p className='link_text'>Already have an account</p>
                    <Link to={'/login'} className='link_text'>Login</Link>
                </div>
                {
                    error && <div className='text-red-400'>{error}</div>
                }
            </Form>
        </section>
    )
}

export default Signup