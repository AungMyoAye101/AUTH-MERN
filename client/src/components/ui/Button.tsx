type buttonType = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string
}

const Button = ({ children, onClick, className }: buttonType) => {
    return (
        <button onClick={onClick} className={`px-4 py-1.5 bg-blue-50  rounded-full cursor-pointer shadow hover:shadow-md  ${className}`}>{children}</button>
    )
}

export default Button