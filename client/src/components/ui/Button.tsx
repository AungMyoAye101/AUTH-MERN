type buttonType = {
    children: React.ReactNode,
    onClick?: () => void,
    style?: string
}

const Button = ({ children, onClick, style }: buttonType) => {
    return (
        <button onClick={onClick} className={`px-4 py-1 bg-neutral-50  text-sm rounded-full cursor-pointer shadow hover:shadow-md border border-neutral-50 transition-transform hover:scale-105 ease-in-out duration-100 ${style}`}>{children}</button>
    )
}

export default Button