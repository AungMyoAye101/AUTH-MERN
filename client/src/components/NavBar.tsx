import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 left-0 right-0 z-50">
            <nav className="mx-auto max-w-6xl p-4 flex justify-between items-center ">
                <div>
                    <h1 className="text-2xl font-bold text-blue-400">Simple <span className="text-neutral-50">Auth</span> </h1>
                </div>

                <div className="flex items-center  gap-2 text-sm">
                    <Link to={'/login'} className="px-4 py-2 bg-blue-400 text-white  text-sm rounded-full ">Login</Link>
                    <Link to={'/signup'} className="px-4 py-2 bg-blue-400 text-white  text-sm rounded-full ">Signup</Link>
                </div>
            </nav>
        </header>
    )
}

export default NavBar