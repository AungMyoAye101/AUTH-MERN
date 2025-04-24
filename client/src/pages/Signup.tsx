
import { signupData } from '../lib/helper'
import Form from '../components/ui/Form'
import { Link } from 'react-router-dom'
import FormController from '../components/ui/FormController'
import { useState } from 'react'




const Signup = () => {
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

            <Form headingText='Signup' method='POST' endpoint={'/auth/register'} data={data} setError={setError} redirect='/' error={error}>
                {
                    signupData.map((data, i) => (<FormController key={i} type={data.type} name={data.name} id={data.name} placeholder={data.placeholder} onChange={(e) => handleChange(e)} style="bg-white" />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <p className='link_text'>Already have an account</p>
                    <Link to={'/login'} className='link_text'>Login</Link>
                </div>
            </Form>
        </section>
    )
}

export default Signup