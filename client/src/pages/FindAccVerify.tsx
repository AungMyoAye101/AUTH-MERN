
import OtpContainer from '../components/OtpContainer'

const FindAccVerify = () => {



    return (
        <section className='container'>

            <OtpContainer heading='Account Verification' endpoint='/auth/forgot_password/otp_verify' redirectURL='/reset_password' />
        </section>
    )
}

export default FindAccVerify