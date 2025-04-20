import Button from "../components/ui/Button"
import FormController from "../components/ui/FormController"


const Home = () => {
    return (
        <div className='flex flex-col gap-4'>

            <Button >text</Button>
            <FormController type="text" name="name" id="name" placeholder="Enter your name" onChange={() => { }} style="bg-white" />
        </div>
    )
}

export default Home