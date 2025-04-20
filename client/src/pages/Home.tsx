import Button from "../components/ui/Button"


const Home = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="space-y-4">
                <h1 className="text-2xl md:4xl font-semibold font-serif ">Welcome User,</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus voluptatem aspernatur deserunt possimus, tenetur quis atque accusantium quod cumque esse eius reiciendis at incidunt magnam dicta iusto. Quae, iste.</p>
                <Button className="">Register now</Button>
            </div>

        </div>
    )
}

export default Home