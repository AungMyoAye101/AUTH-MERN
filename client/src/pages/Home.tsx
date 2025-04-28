import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

import img from '../assets/welcome.svg'
const Home = () => {
    const { name } = useAuth()
    return (
        <div style={{ height: 'calc(100vh - 64px)' }} className='flex justify-center items-center'>



            <div className="flex flex-col items-center gap-1  max-w-2xl ">
                <img src={img} alt="welcome icon" className=" w-40 md:w-48 aspect-square " />
                <h2 className="text-base md:text-lg font-semibold font-serif">Hello {name ? name : "Visitor"}! </h2>

                <h1 className="text-2xl md:5xl font-bold font-serif ">Welcome to Simple Auth,</h1>
                <p className="text-sm md:text-base font-serif text-center">Let's start with a simple authentication setup and feel free to explore.</p>
                <div className="mt-2">


                    {
                        name ? <Link to={'/dashboard'} className="border_btn">Dashboard</Link> : <Link to={'/signup'} className="border_btn">Register now</Link>
                    }
                </div>



            </div>

        </div>
    )
}

export default Home