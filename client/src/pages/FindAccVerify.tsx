
import { useEffect, useState } from 'react'

import FormController from '../components/ui/FormController'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { base_url } from '../lib/helper'
import Button from '../components/ui/Button'
import OtpContainer from '../components/OtpContainer'



const OTP_Schema = z.object({
    otp: z.string().min(6, "OTP must be 6 characters").max(6, "OTP must be 6 characters"),
    userId: z.string().optional()
})


const FindAccVerify = () => {



    return (
        <section className='container'>

            <OtpContainer heading='Account Verification' endpoint='/auth/forgot_password/otp_verify' redirectURL='/reset_password' />
        </section>
    )
}

export default FindAccVerify