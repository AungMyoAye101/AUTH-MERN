
import Form from '../components/ui/Form'
import FormController from '../components/ui/FormController'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <section className='flex justify-center items-center  p-4'>

            <Form headingText='Login'>
                {


                    [1, 2, 3, 4].map((i) => (<FormController key={i} type="email" name="name" id="name" placeholder="Enter your name" onChange={() => { }} style="bg-white" />))
                }
                <div className='flex justify-between items-center gap-2 text-sm'>
                    <Link to={'/'} className='text-blue-400'>Forgot password?</Link>
                    <Link to={'/signup'} className='text-blue-400'>Sign up</Link>
                </div>
            </Form>
        </section>
    )
}

export default Login