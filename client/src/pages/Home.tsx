import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

import img from '../assets/welcome.svg'
const Home = () => {
    const { name } = useAuth()
    return (
        <div className='h-[calc(100vh-100px)] flex justify-center items-center  '>



            <div className="flex flex-col items-center gap-1  max-w-2xl ">
                <img src={img} alt="welcome icon" className=" w-40 md:w-48 aspect-square " />
                <h2 className="text-base md:text-lg font-semibold font-serif">Hello {name ? name : "Visitor"}! </h2>

                <h1 className="text-2xl md:5xl font-bold font-serif ">Welcome to Simple Auth,</h1>
                <p className="text-sm md:text-base font-serif text-center">Let's start with a simple authentication setup and feel free to explore.</p>
                <div className="mt-2">


                    {
                        name ? <Link to={'/dashboard'} className="border border-orange-400 bg-transparent ">Dashboard</Link> : <Link to={'/signup'} className="border-2 border-blue-400 bg-transparent px-4 py-2 rounded-full text-xs  md:text-sm font-serif hover:bg-blue-400 hover:text-white transition-all duration-100 ease-in-out">Register now</Link>
                    }
                </div>



            </div>

        </div>
    )
}

export default Home