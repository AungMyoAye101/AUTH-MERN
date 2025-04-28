
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
        <section className='container'>

            <Form headingText='Signup' method='POST' endpoint={'/auth/register'} data={data} setError={setError} redirect='/' error={error}>
                <h2 className="text-base md:text-lg font-medium font-serif text-center text-neutral-700">Please create an account</h2>
                {
                    signupData.map((data, i) => (<FormController key={i} type={data.type} name={data.name} id={data.name} placeholder={data.placeholder} onChange={(e) => handleChange(e)} />))
                }
                <div className='flex justify-between items-center gap-2 '>
                    <p className='link_text'>Already have an account</p>
                    <Link to={'/login'} className='link_text'>Login</Link>
                </div>
            </Form>
        </section>
    )
}

export default Signup