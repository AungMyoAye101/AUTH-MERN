import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "../components/ui/Button"
import { useAuth } from "../context/AuthProvider"
import { showToast } from "../context/ToastProvider"
import { useEffect, useState } from "react"
import { base_url } from "../lib/helper"



const Profile = () => {
    const [user, setuser] = useState({
        _id: '',
        name: "",
        email: "",
        isVerified: '',

    })
    const { id, fetchUser } = useAuth()
    const params = useParams()
    // console.log(user) // Debugging statement removed
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const getUser = async () => {
        const res = await fetch(base_url + "/account/getUser", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ id: params.id }),
            credentials: "include"
        })
        const resData = await res.json()
        setuser(resData.user)
    }

    useEffect(() => {
        getUser()
    }, [])

    const deleteHandler = async () => {
        setLoading(true)
        try {
            const res = await fetch(base_url + '/auth/delete_account', {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'
            })
            const resData = await res.json()
            if (!res.ok || resData.success === false) {
                setLoading(false)
                showToast('error', resData.message)
                return
            }
            fetchUser()
            showToast('success', resData.message)
            setLoading(false)
            navigate('/')
        } catch (error: any) {
            console.log(error.message)
            showToast('error', error.message)
            setLoading(false)
        }
    }
    return (

        <section className="container">
            <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-2 w-96 border" >

                <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-full bg-orange-400 flex justify-center items-center text-2xl font-semibold text-blue-50 ">{user.name[0]}</div>
                    <div className="flex flex-col ">
                        <h1 className="font-serif text-xl font-semibold ">{user.name}</h1>
                        <p className="text-sm text-neutral-700">{user.email}</p>
                    </div>
                </div>
                {
                    id === params.id && <div className="flex  gap-1 self-end">
                        <Link to={`/update/${id}`} className=" link_btn text-xs ">Update</Link>
                        {
                            !user.isVerified && <Link to={'/account_verify'} className=" link_btn bg-orange-400 text-xs ">Verify Now</Link>
                        }

                        <Button loading={loading} onClick={deleteHandler} className="text-xs bg-red-400 rounded-full">Delete</Button>
                    </div>
                }

            </div>

        </section>

    )
}

export default Profile