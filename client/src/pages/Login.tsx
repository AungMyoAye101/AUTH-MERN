
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
        <section className='container'>

            <Form headingText='Login' method='POST' endpoint={'/auth/login'} data={data} setError={setError} redirect='/' error={error}>
                <h2 className="text-base md:text-lg font-medium font-serif text-center text-neutral-700">Please login your account</h2>
                {
                    loginData.map((field, i) => (<FormController key={i} type={field.type} name={field.name} id={field.name} placeholder={field.placeholder} onChange={handleChange} icon={field.icon} />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <Link to={'/find_account'} className='link_text'>Forgot password?</Link>
                    <Link to={'/signup'} className='link_text'>Sign up</Link>
                </div>

            </Form>
        </section>
    )
}

export default Login