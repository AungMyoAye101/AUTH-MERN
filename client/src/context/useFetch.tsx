// import { createContext, useState } from "react"

// type FetchContextType = {
//     data: any,
//     loading: boolean,
//     error: string
// }
// const base_url = import.meta.env.VITE_BASE_URL

// const fetchContext = createContext<FetchContextType | null>(null)
// export const FetchProvider = ({ children }: { children: React.ReactNode }) => {
//     const [data, setData] = useState()
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     return (
//         <fetchContext.Provider value={{ data, loading, error }}>{children}</fetchContext.Provider>
//     )
// }

