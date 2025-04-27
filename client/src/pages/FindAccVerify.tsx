
import React, { useEffect, useState } from 'react'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
// import Button from '../components/ui/Button'
// import { base_url } from '../lib/helper'
// import { useAuth } from '../context/AuthProvider'
import { useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'





const OTP_EXPIRES_IN = 5 * 60 // 5 minutes
// const RESEND_OTP = 60

const FindAccVerify = () => {
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const email = searchParams.get("email")

    const [data, setData] = useState({ otp: '', userId })
    const [error, setError] = useState('')
    const [otpTimer, setOtpTimer] = useState(OTP_EXPIRES_IN)
    // const [error, setError] = useState('')






    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((pre) => ({ ...pre, [name]: value }))
    }

    // request OTP from server




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
    }, [])

    // //Resend OTP timer
    // useEffect(() => {
    //     if (resendTimer === 0) {
    //         setResend(true)
    //         return
    //     }

    //     console.log(resendTimer)
    //     const intervalId = setInterval(() => {
    //         setResendTimer(pre => pre - 1)
    //     }, 1000)
    //     return () => clearInterval(intervalId)
    // }, [resendTimer])

    // formatting for mm:ss
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)

        const sec = (seconds % 60).toString();
        return `${min}:${sec}`;
    };


    return (
        <section className='flex justify-center'>
            <Form headingText='Account Verification' endpoint='/auth/forgot_password/otp_verify' method='POST' data={data} setError={setError} redirect={'/reset_password'} error={error}>
                <h2 className=' font-serif text-center'>We have sent  OTP code to<br /> <span className='text-xs'>{email}</span>.</h2>
                <div className='text-sm font-medium text-neutral-600'> OTP expires in <span className='font-medium'>{formatTime(otpTimer)}</span></div>
                <FormController type='number' name='otp' id='otp' onChange={handleChange} placeholder='Please enter OTP code' />
                {/* <div className='flex justify-between items-center '><div className='text-sm font-medium text-neutral-600'>Didn't get the code</div><Button loading={!resend} onClick={otpSender} className={`bg-orange-400 flex justify-center items-center font-sans w-20 h-8 text-sm ${!resend ? "cursor-wait" : ''}`}>{resend ? "Resend" : resendTimer}</Button>  </div> */}
            </Form>
        </section>
    )
}

export default FindAccVerify