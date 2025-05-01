
import { useEffect, useState } from 'react'

import FormController from '../components/ui/FormController'
// import Button from '../components/ui/Button'
// import { base_url } from '../lib/helper'
// import { useAuth } from '../context/AuthProvider'
import { useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { base_url } from '../lib/helper'
import Button from '../components/ui/Button'



const OTP_Schema = z.object({
    otp: z.string().min(6, "OTP must be 6 characters").max(6, "OTP must be 6 characters"),
    userId: z.string().optional()
})

type OTP_Type = z.infer<typeof OTP_Schema>

const OTP_EXPIRES_IN = 5 * 60 // 5 minutes


const FindAccVerify = () => {
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const email = searchParams.get("email")
    const [error, setError] = useState('')
    const [otpTimer, setOtpTimer] = useState(OTP_EXPIRES_IN)
    const [loading, setLoading] = useState(false)




    const { register, handleSubmit, formState: { errors } } = useForm<OTP_Type>({
        resolver: zodResolver(OTP_Schema),
        defaultValues: {
            otp: undefined,
            userId: userId || undefined
        }
    });

    const OTP_Verify = async (data: OTP_Type) => {
        setLoading(true)

        try {
            const res = await fetch(base_url + "/auth/forgot_password/otp_verify", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const response = await res.json()
            if (!res.ok || response.success === false) {
                setError(response.message)
                showToast("error", response.message)
                return
            }
            showToast("success", response.message)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Server ERR:Faild to verify OTP ')
            }
        }
    }




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



    // formatting for mm:ss
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)

        const sec = (seconds % 60).toString();
        return `${min}:${sec}`;
    };

    const otpNoti = otpTimer <= 0 ? "expired " : `OTP expires in ${formatTime(otpTimer)}`

    return (
        <section className='container'>

            <form onSubmit={handleSubmit(OTP_Verify)} className='form_container'>
                <h2 className=' font-serif text-center text-neutral-700'>We have sent  OTP code to<br /> <span className='text-xs'>{email}</span>.</h2>
                <div className='text-sm font-medium text-neutral-600'> {otpNoti}</div>

                <FormController
                    type='number' name='otp'
                    register={register}
                    error={errors.otp}
                    placeholder='Enter your OTP code.' />
                <Button type='submit' loading={loading}>Send</Button>

                {
                    error && <p className='error_message'>{error}</p>
                }

            </form>
        </section>
    )
}

export default FindAccVerify