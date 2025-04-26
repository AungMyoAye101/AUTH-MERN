type buttonType = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: "button" | "submit" | "reset",
    loading?: boolean
}

const Button = ({ children, onClick, className, type, loading }: buttonType) => {
    const spinner = <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent bg-transparent animate-spin"></div>
    return (
        <button type={type || "button"} disabled={loading} onClick={onClick} className={`px-4 py-1.5 bg-blue-400 text-white font-serif  rounded-full cursor-pointer shadow hover:shadow-md  text-sm flex justify-center items-center ${className}`}>{loading ? spinner : children}</button>
    )
}

export default Button