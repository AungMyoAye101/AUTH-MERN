type buttonType = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: "button" | "submit" | "reset",
    loading?: boolean
}

const Button = ({ children, onClick, className, type, loading }: buttonType) => {
    return (
        <button type={type || "button"} disabled={loading} onClick={onClick} className={`px-4 py-1.5 bg-blue-400 text-white font-serif  rounded-full cursor-pointer shadow hover:shadow-md  ${className}`}>{children}</button>
    )
}

export default Button