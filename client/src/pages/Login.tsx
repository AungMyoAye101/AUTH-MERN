
import { useState } from 'react'
import { loginData } from '../lib/helper'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { Link } from 'react-router-dom'


const Login = () => {
    const [data, setData] = useState({
        name: '',
        email: "",
        password: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((pre) => ({ ...pre, [name]: value }))
    }

    return (
        <section className='flex justify-center items-center  p-4'>

            <Form headingText='Login' method='POST' endpoint={'auth/login'} data={data} setError={setError} redirect='dashboard'>
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