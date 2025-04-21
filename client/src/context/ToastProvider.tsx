
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";




const ToastProvider = () => {
    return (
        <ToastContainer position="top-right" autoClose={2000} />
    )
}


export const showToast = (type: "success" | "error" | "warn" | '', message: string) => {
    if (type === 'success') {
        toast.success(message)
    } else if (type === 'error') {
        toast.error(message)
    } else if (type === 'warn') {
        toast.warn(message)
    } else {
        toast.info(message)
    }
}

export default ToastProvider