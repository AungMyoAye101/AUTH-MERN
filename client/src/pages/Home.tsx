import Button from "../components/ui/Button"
import { useAuth } from "../context/AuthProvider"



const Home = () => {
    const { name, email, isVerified } = useAuth()
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="space-y-4">
                <h1 className="text-2xl md:4xl font-semibold font-serif ">Welcome {name},</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus voluptatem aspernatur deserunt possimus, tenetur quis atque accusantium quod cumque esse eius reiciendis at incidunt magnam dicta iusto. Quae, iste. {email}</p>
                <div>

                    {
                        isVerified ? "" : "Please verify your account."
                    }
                </div>

                <Button className="">Register now</Button>

            </div>

        </div>
    )
}

export default Home