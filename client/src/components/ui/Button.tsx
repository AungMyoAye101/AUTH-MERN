type buttonType = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: "button" | "submit" | "reset"
}

const Button = ({ children, onClick, className, type }: buttonType) => {
    return (
        <button type={type || "button"} onClick={onClick} className={`px-4 py-1.5 bg-blue-50  rounded-full cursor-pointer shadow hover:shadow-md  ${className}`}>{children}</button>
    )
}

export default Button