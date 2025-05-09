import { useEffect, useRef } from 'react'
import { showToast } from '../context/ToastProvider'
import { base_url } from '../lib/helper'
import OtpContainer from '../components/OtpContainer'


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