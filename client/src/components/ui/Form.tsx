
import Button from "./Button"
type FormPropsTypes = {
    children: React.ReactNode,
    headingText: string,
}

const Form = ({ children, headingText }: FormPropsTypes) => {
    return (
        <form className="min-w-lg w-96 max-w-xl bg-white p-4 rounded-md border flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-center">{headingText}</h1>
            {children}
            <Button>submit</Button>
        </form>
    )
}

export default Form