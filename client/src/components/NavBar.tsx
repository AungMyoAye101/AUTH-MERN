import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import Button from "./ui/Button"



const NavBar = () => {
    const { id, isVerified, logout, name } = useAuth()
    // Removed redundant useAuth call and debug console.log
    return (
        <header className=" sticky top-0 left-0 right-0 z-50 h-16 ">
            <nav className="mx-auto max-w-6xl p-4 flex justify-between items-center ">
                <Link to={'/'}>
                    <h1 className="text-2xl text-blue-400 md:hidden font-serif font-bold">S<span className="text-neutral-700">A</span></h1>
                    <h1 className="text-2xl font-bold text-blue-400 font-serif hidden md:block">Simple <span className="text-neutral-800 -ml-1">auth</span> </h1>
                </Link>

                <div className="flex items-center  gap-2 text-sm">
                    {id ?
                        <>

                            <Button onClick={logout} className="link_btn">Logout</Button>
                            <div className="relative">

                                <Link to={`/user/${id}`} className="cursor-pointer">  <div className="w-10 h-10 rounded-full bg-orange-400 flex justify-center items-center text-xl font-semibold text-blue-50 ">
                                    {name[0]}
                                </div></Link>
                                {
                                    isVerified ? <div className="w-4 h-4 rounded-full bg-green-500 absolute -right-1 bottom-0"><img src="/assets/check.svg" alt="check icon" /></div> : <Link to={"/account_verify"} className="w-4 h-4 rounded-full bg-yellow-300 absolute -right-1 bottom-0 flex justify-center items-center font-semibold ">!</Link>
                                }

                            </div>
                        </>
                        : <>
                            <Link to={'/login'} className="link_btn ">Login</Link>
                            <Link to={'/signup'} className="link_btn">Signup</Link>
                        </>

                    }

                </div>
            </nav>
        </header>
    )
}

export default NavBar