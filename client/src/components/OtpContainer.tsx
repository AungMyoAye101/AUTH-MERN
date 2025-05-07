import React, { FC, useEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import { base_url } from '../lib/helper'
import { showToast } from '../context/ToastProvider'
import { useNavigate } from 'react-router-dom'

type OtpPropType = {
    heading: string,
    endpoint: string,
    redirectURL: string
}

const OTP_EXPIRES_IN = 5 * 60
const OtpContainer: FC<OtpPropType> = ({ heading, endpoint, redirectURL }) => {
    const [otp, setOtp] = useState(Array(6).fill(''))
    const [otpTimer, setOtpTimer] = useState(OTP_EXPIRES_IN)
    const inputRefs = useRef<HTMLInputElement[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (value: string, index: number) => {

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp)

            if (index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
    }
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6)
        const newOtp = pasteData.split('')
        setOtp(newOtp)

        newOtp.forEach((digit, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = digit
            }
        })
        inputRefs.current[Math.min(newOtp.length - 1, 5)]?.focus();

    }
    useEffect(() => {
        if (otpTimer === 0) {

            return
        }

        const intervalId = setInterval(() => {

            setOtpTimer(pre => pre - 1)

        }, 1000)


        return () => clearInterval(intervalId)

    }, [otpTimer])


    const formatTime = (num: number) => {
        const min = Math.floor(num / 60)
        const sec = Math.floor(num % 60).toString().padStart(2, '0')

        return `${min}:${sec}`
    }

    const OnSubmitHandle = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = otp.join('')
        console.log(data)


        try {
            setLoading(true)
            const res = await fetch(base_url + endpoint, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ otp: data }),
                credentials: "include"
            })
            const { success, message } = await res.json()
            if (!res.ok || success === false) {
                showToast("error", message)
                setError(message)
                return
            }
            showToast("success", message)
            navigate(redirectURL)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                console.log(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className='container'>
            <form onSubmit={OnSubmitHandle} className='form_container '>
                <div className='text-center space-y-1'>

                    <h1 className="text-2xl  font-bold text-neutral-700">{heading}</h1>
                    <p className='text-sm font-semibold text-neutral-700'>Enter the 6-digit code sent to your email</p>
                </div>
                {
                    otpTimer <= 0 ? <p className='text-sm font-semibold text-red-400'>Expired</p> : <p className={`text-sm font-semibold ${otpTimer < 60 ? "text-red-400 animate-pulse" : ''}`}>OTP expire in {formatTime(otpTimer)}</p>
                }

                <div className='flex gap-1 mx-auto'>
                    {
                        otp.map((_, i) => (
                            <input
                                key={i}
                                ref={(ele) => { if (ele) inputRefs.current[i] = ele; }}
                                type="text"
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onPaste={handlePaste}
                                className='w-12 h-14 text-center flex justify-center items-center border border-neutral-600 rounded-md  focus:outline-none  ' />
                        ))
                    }
                </div>

                <Button loading={loading} type='submit' className='rounded-full'>Verify Now</Button>
                {
                    error && <p className='error_message'>{error}</p>
                }

            </form>
        </section>
    )
}

export default OtpContainer