import React, { useEffect, useRef, useState } from 'react'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { base_url } from './Signup'
import { showToast } from '../context/ToastProvider'

const AccountVerify = () => {
    const [data, setData] = useState({ otp: '' })
    const [error, setError] = useState()
    const hasSentOTP = useRef(false)
    console.log(data, " in OTP ")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((pre) => ({ ...pre, [name]: value }))
    }

    const otpSender = async () => {
        try {
            const res = await fetch(base_url + 'auth/verify', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"

            })
            const resData = await res.json()
            if (!res.ok) {
                console.error(resData.message)
                return
            }
            console.log(resData.user)
            showToast("success", resData.message)

        } catch (error: any) {
            showToast("error", error.message)
        }
    }

    useEffect(() => {
        if (!hasSentOTP.current) {
            otpSender()
            hasSentOTP.current = true
        }

    }, [])



    return (
        <section>
            <Form headingText='Account Verification' endpoint='auth/verify_account' method='POST' data={data} setError={setError} redirect={'/'}>
                <h2 className=' font-serif text-center'>We have send OTP code to your email.</h2>
                <FormController type='text' name='otp' id='otp' onChange={handleChange} placeholder='Please enter OTP code' />
                {
                    error && <div className='text-red-400 text-sm'>{error}</div>
                }

            </Form>
        </section>
    )
}

export default AccountVerify