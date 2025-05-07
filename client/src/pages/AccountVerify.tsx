import { useEffect, useRef } from 'react'
import { showToast } from '../context/ToastProvider'
import { base_url } from '../lib/helper'
import OtpContainer from '../components/OtpContainer'

// const OTP_Schema = z.object({
//     otp: z.string().min(6, "OTP must be 6 characters").max(6, "OTP must be 6 characters"),
//     userId: z.string().optional()
// })

// type OTP_Type = z.infer<typeof OTP_Schema>


// const OTP_EXPIRES_IN = 5 * 60 // 5 minutes
// const RESEND_OTP = 60

const AccountVerify = () => {

    const hasSentOTP = useRef(false)







    // request OTP from server
    const otpSender = async () => {
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
                showToast('error', resData.message)
                return
            }


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



    return (
        <section className='container'>
            <OtpContainer heading='Account Verification' endpoint='/auth/verify_account' redirectURL="/" />
        </section>
    )
}

export default AccountVerify