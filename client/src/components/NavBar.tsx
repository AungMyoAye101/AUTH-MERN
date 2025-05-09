import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

import { useState } from "react"
import Button from "./ui/Button"



const NavBar = () => {
    const { id, isVerified, logout, name } = useAuth()
    const [open, setOpen] = useState(false)
    return (
        <header className=" sticky top-0 left-0 right-0 z-50 h-16 ">
            <nav className="mx-auto max-w-6xl p-4 flex justify-between items-center  relative">
                <Link to={'/'} className="flex items-center gap-1">
                    <img src="/assets/auth-logo.png" alt="auth logo" className="w-10 " />
                    <h1 className="text-2xl font-bold text-blue-400 font-serif hidden md:block">Simple <span className="text-neutral-800 -ml-1">auth</span> </h1>
                </Link>

                <div className="hidden sm:flex items-center  gap-2 text-sm ">
                    {id ?
                        <>

                            <Link to={'/dashboard'} className="text-white bg-blue-500 text-xs md:text-sm font-serif px-4 py-2 rounded-full flex justify-center items-center">Dashboard</Link>
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
                {/* menu toggle bars */}
                <img src="/assets/menu.svg" alt="menu icon" className="w-5 cursor-pointer sm:hidden" onClick={() => setOpen(pre => !pre)} />
                {
                    open && <div className="absolute right-0 w-40 bg-white py-6 px-2 top-12 flex flex-col text-center font-serif  rounded-xl shadow">
                        {
                            id ? <>
                                <Link to={`/user/${id}`} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full" onClick={() => setOpen(false)}>Profile</Link>

                                <Link to={`/dashboard`} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full" onClick={() => setOpen(false)}>Dashboard</Link>
                                {
                                    !isVerified && <Link to={'/account_verify'} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full" onClick={() => setOpen(false)}>Verify now</Link>
                                }
                                <Link to={`/update/${id}`} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full" onClick={() => setOpen(false)}>Update</Link>
                                <button onClick={() => { logout(); setOpen(false) }} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full text-red-400">Logout</button>

                            </> : <>  <Link to={'/login'} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full" onClick={() => setOpen(false)}>Login</Link>
                                <Link to={'/signup'} className="text-sm hover:bg-purple-400 hover:text-white p-2 rounded-full" onClick={() => setOpen(false)}>Signup</Link></>
                        }

                    </div>
                }

            </nav>
        </header>
    )
}

export default NavBar