
import { loginData } from '../assets/lib/helper'
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <section className='flex justify-center items-center  p-4'>

            <Form headingText='Login'>
                {


                    loginData.map((data, i) => (<FormController key={i} type={data.type} name={data.name} id={data.name} placeholder={data.placeholder} onChange={() => { }} style="bg-white" />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <Link to={'/'} className='link_text'>Forgot password?</Link>
                    <Link to={'/signup'} className='link_text'>Sign up</Link>
                </div>
            </Form>
        </section>
    )
}

export default Login