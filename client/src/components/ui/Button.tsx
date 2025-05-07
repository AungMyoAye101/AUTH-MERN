import React from "react"

type buttonType = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: "button" | "submit" | "reset",
    loading?: boolean,
    icon?: string
}

const Button = ({ children, onClick, className, type, loading, icon }: buttonType) => {
    const spinner = <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent bg-transparent animate-spin"></div>
    return (
        <button type={type || "button"} disabled={loading} onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white  rounded-full cursor-pointer shadow hover:shadow-md  text-sm flex justify-center items-center ${className}`}>{loading ? spinner : children} {icon ? <img src={icon} alt="icon" /> : ''}</button>
    )
}

export default Button