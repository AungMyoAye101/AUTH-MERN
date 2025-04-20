
import Button from "./Button"
type FormPropsTypes = {
    children: React.ReactNode,
    headingText: string,
}

const Form = ({ children, headingText }: FormPropsTypes) => {
    return (
        <form className="min-w-lg w-96 max-w-xl bg-white px-4 py-6 rounded-lg shadow-md border flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-center font-serif">{headingText}</h1>
            {children}
            <Button className="bg-blue-200 h-10">submit</Button>
        </form>
    )
}

export default Form