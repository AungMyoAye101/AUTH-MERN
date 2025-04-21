import Button from "../components/ui/Button"
import { showToast } from "../context/ToastProvider"


const Home = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="space-y-4">
                <h1 className="text-2xl md:4xl font-semibold font-serif ">Welcome User,</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus voluptatem aspernatur deserunt possimus, tenetur quis atque accusantium quod cumque esse eius reiciendis at incidunt magnam dicta iusto. Quae, iste.</p>
                <Button className="">Register now</Button>
                <button onClick={() => showToast('', "hello")}>Show</button>
                <button onClick={() => showToast('warn', "This is warning")}>Show</button>
                <button onClick={() => showToast('success', "Success")}>Success</button>
                <button onClick={() => showToast('error', "This is error")}>error</button>
            </div>

        </div>
    )
}

export default Home