import React, { useState } from 'react'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { useAuth } from '../context/AuthProvider'

const ResetPassword = () => {
    const { id } = useAuth()
    const [data, setdata] = useState({ password: '', id })
    const [error, setError] = useState('')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setdata((pre) => ({ ...pre, [name]: value }))
    }


    return (
        <section>
            <Form headingText='Add new password' endpoint='/auth/reset_password' redirect='/' method='POST' data={data} error={error} setError={setError} >
                <FormController onChange={onChange} type='password' placeholder='password' name='password' id='password' />
            </Form>
        </section>
    )
}

export default ResetPassword