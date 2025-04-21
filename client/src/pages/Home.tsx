import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"



const Home = () => {
    const { name, email } = useAuth()
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="flex flex-col gap-4 items-start">
                <h1 className="text-2xl md:4xl font-semibold font-serif ">Welcome {name ? name : "to Simple Auth"},</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus voluptatem aspernatur deserunt possimus, tenetur quis atque accusantium quod cumque esse eius reiciendis at incidunt magnam dicta iusto. Quae, iste. {email}</p>
                <Link to={'/signup'} className="link_btn">Register now</Link>

            </div>

        </div>
    )
}

export default Home