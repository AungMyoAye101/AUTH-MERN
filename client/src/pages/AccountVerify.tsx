import React, { useEffect, useRef, useState } from 'react'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { base_url } from './Signup'
import { showToast } from '../context/ToastProvider'
import Button from '../components/ui/Button'




const OTP_EXPIRES_IN = 5 * 60 // 5 minutes
const RESEND_OTP = 60

const AccountVerify = () => {
    const [data, setData] = useState({ otp: '' })
    const [error, setError] = useState()

    const [otpTimer, setOtpTimer] = useState(OTP_EXPIRES_IN)
    const [resendTimer, setResendTimer] = useState(RESEND_OTP)
    const [resend, setResend] = useState(false)
    const hasSentOTP = useRef(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((pre) => ({ ...pre, [name]: value }))
    }

    // request OTP from server
    const otpSender = async () => {
        console.log('otp sending...')
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
            setOtpTimer(OTP_EXPIRES_IN)
            setResendTimer(RESEND_OTP)
            setResend(false)
            showToast("success", resData.message)
            // navigate('/') // Redirect after OTP verification

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

    //OTP expire count down
    useEffect(() => {
        if (otpTimer === 0) {
            showToast('warn', "Your OTP code has expired , Request new one.")
            return
        }


        const intervalId = setInterval(() => {
            setOtpTimer(pre => pre - 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [otpTimer])

    //Resend OTP timer
    useEffect(() => {
        if (resendTimer === 0) {
            setResend(true)
            return
        }

        console.log(resendTimer)
        const intervalId = setInterval(() => {
            setResendTimer(pre => pre - 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [resendTimer])

    // formatting for mm:ss
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)

        const sec = (seconds % 60).toString();
        return `${min}:${sec}`;
    };


    return (
        <section className='flex justify-center'>
            <Form headingText='Account Verification' endpoint='auth/verify_account' method='POST' data={data} setError={setError} redirect={'/'}>
                <h2 className=' font-serif text-center'>We have sent the OTP code to your email.</h2>
                <div className='text-sm font-medium text-neutral-600'> OTP expires in <span className='font-medium'>{formatTime(otpTimer)}</span></div>
                <FormController data={data.otp} type='number' name='otp' id='otp' onChange={handleChange} placeholder='Please enter OTP code' />
                <div className='flex justify-between items-center '><div className='text-sm font-medium text-neutral-600'>Didn't get the code</div><Button loading={!resend} onClick={otpSender} className={`bg-orange-400 font-sans w-20 h-8 text-sm ${!resend ? "cursor-wait" : ''}`}>{resend ? "Resend" : resendTimer}</Button>  </div>

                {
                    error && <div className='text-red-400 text-sm'>{error}</div>
                }



            </Form>
        </section>
    )
}

export default AccountVerify