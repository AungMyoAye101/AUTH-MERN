import React, { useState } from 'react'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { useAuth } from '../context/AuthProvider'

const ResetPassword = () => {
    const { id } = useAuth()
    const [password, setPassword] = useState('')
    // console.log(data, "otp sending....") // Removed for production
    const [error, setError] = useState('')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setPassword(e.target.value)
    }


    return (
        <section className='container'>
            <Form headingText='Add new password' endpoint='/auth/reset_password' redirect='/' method='POST' data={{ password, id }} error={error} setError={setError} >
                <FormController onChange={onChange} type='password' placeholder='password' name='password' id='password' icon='/assets/key.svg' />
            </Form>
        </section>
    )
}

export default ResetPassword