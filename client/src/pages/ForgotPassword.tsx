import React, { useState } from 'react'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'

const ForgotPassword = () => {
    const [data, setdata] = useState({ password: '' })
    const [error, setError] = useState('')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setdata((pre) => ({ ...pre, [name]: value }))
    }


    return (
        <section>
            <Form headingText='Find Your account' endpoint='/auth/find_account' redirect='/account_verify' method='POST' data={data} error={error} setError={setError} >
                <FormController onChange={onChange} type='password' placeholder='password' name='password' id='password' />
            </Form>
        </section>
    )
}

export default ForgotPassword