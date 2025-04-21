import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import Button from "./ui/Button"



const NavBar = () => {
    const { id, isVerified, logout } = useAuth()
    return (
        <header className="bg-white shadow-md sticky top-0 left-0 right-0 z-50 h-16">
            <nav className="mx-auto max-w-6xl p-4 flex justify-between items-center ">
                <Link to={'/'}>
                    <h1 className="text-2xl font-bold text-blue-400 font-serif">Simple <span className="text-gray-700 -ml-1">auth</span> </h1>
                </Link>

                <div className="flex items-center  gap-2 text-sm">
                    {id ?
                        <>
                            <Link to={'/dashboard'} className="px-4 py-2 bg-blue-400 text-white  text-sm rounded-full ">Dashboard</Link>
                            <Button onClick={logout} className="px-4 py-2 bg-blue-400 text-white  text-sm rounded-full ">Logout</Button>
                            <div className="relative">

                                <Link to={`/profile/${id}`} className="cursor-pointer">  <div className="w-10 h-10 rounded-full bg-blue-400 ">

                                </div></Link>
                                {
                                    isVerified ? <div className="w-4 h-4 rounded-full bg-green-300 absolute -right-1 bottom-0"></div> : <Link to={"/account_verify"} className="w-4 h-4 rounded-full bg-yellow-300 absolute -right-1 bottom-0"></Link>
                                }

                            </div>
                        </>
                        : <>
                            <Link to={'/login'} className="px-4 py-2 bg-blue-400 text-white  text-sm rounded-full ">Login</Link>
                            <Link to={'/signup'} className="px-4 py-2 bg-blue-400 text-white  text-sm rounded-full ">Signup</Link>
                        </>

                    }

                </div>
            </nav>
        </header>
    )
}

export default NavBar