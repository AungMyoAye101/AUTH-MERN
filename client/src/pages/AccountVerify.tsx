import { useEffect, useRef, useState } from 'react'
import FormController from '../components/ui/FormController'
import { showToast } from '../context/ToastProvider'
import Button from '../components/ui/Button'
import { base_url } from '../lib/helper'
import { useAuth } from '../context/AuthProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

const OTP_Schema = z.object({
    otp: z.string().min(6, "OTP must be 6 characters").max(6, "OTP must be 6 characters"),
    userId: z.string().optional()
})

type OTP_Type = z.infer<typeof OTP_Schema>


const OTP_EXPIRES_IN = 5 * 60 // 5 minutes
const RESEND_OTP = 60

const AccountVerify = () => {
    const [error, setError] = useState('')
    const [otpTimer, setOtpTimer] = useState(OTP_EXPIRES_IN)
    const [resendTimer, setResendTimer] = useState(RESEND_OTP)
    const [resend, setResend] = useState(false)
    const hasSentOTP = useRef(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { email, fetchUser } = useAuth()




    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(OTP_Schema) })

    //verify otp and check email
    const submitHandle = async (data: OTP_Type) => {
        setLoading(true)
        try {
            const res = await fetch(base_url + "/auth/verify_account", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            const response = await res.json()
            if (!res.ok || response.success === false) {
                setError(response.message)
                showToast("error", response.message)
                return
            }
            showToast("success", response.message)
            fetchUser()
            navigate('/')

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }

        } finally {
            setLoading(false)
        }
    }

    // request OTP from server
    const otpSender = async () => {
        setOtpTimer(OTP_EXPIRES_IN)
        setResendTimer(RESEND_OTP)
        try {
            const res = await fetch(base_url + '/auth/verify', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"

            })
            const resData = await res.json()
            if (!res.ok || resData.success === false) {
                setError(resData.message)
                return
            }

            setResend(false)
            showToast("", resData.message)
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
        const intervalId = setInterval(() => {
            setResendTimer(pre => pre - 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [resendTimer])

    // formatting for mm:ss
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);

        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const otpNoti = otpTimer <= 0 ? "expired " : `OTP expires in ${formatTime(otpTimer)}`
    return (
        <section className='container'>
            <form onSubmit={handleSubmit(submitHandle)} className='form_container'>
                <h2 className=' font-serif text-center'>We have sent  OTP code to <span className='text-sm'>{email}</span>.</h2>
                <div className='text-sm font-medium text-neutral-600'> {otpNoti}</div>
                <FormController
                    type='number'
                    name='otp'
                    register={register}
                    error={errors.otp}
                    placeholder='Enter your OTP code.' />

                <div className='flex justify-between items-center '><div className='text-sm font-medium text-neutral-600'>Didn't get the code</div><button type='button' onClick={otpSender} className={` text-sm ${!resend ? "cursor-wait" : ''}`}>{resend ? "Resend" : resendTimer}</button>  </div>


                <Button type='submit' loading={loading}>Submit</Button>
                {
                    error && <p className='error_message'>{error}</p>
                }
            </form>
        </section>
    )
}

export default AccountVerify