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
    const [loading, setLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const navigate = useNavigate()
    const getUser = async () => {
        try {
            setIsFetching(true)
            const res = await fetch(base_url + "/account/getUser", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id: params.id }),
                credentials: "include"
            })
            const resData = await res.json()
            if (!res.ok || resData.success === false) {
                console.error(resData.message)
                return
            }
            setuser(resData.user)

        } catch (error) {
            if (error instanceof Error) console.error(error.message)

        } finally {
            setIsFetching(false)
        }

    }

    useEffect(() => {
        getUser()
    }, [])

    const deleteHandler = async () => {
        try {
            setLoading(true)
            const res = await fetch(base_url + '/auth/delete_account', {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'
            })
            const resData = await res.json()
            if (!res.ok || resData.success === false) {

                showToast('error', resData.message)
                return
            }
            fetchUser()
            showToast('success', resData.message)

            navigate('/')
        } catch (error: any) {
            showToast('error', error.message)

        } finally {
            setLoading(false)
        }
    }



    const fetchLoading = <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-2 w-96 border" >
        <div className="flex gap-4 items-center w-full">
            <div className="w-20 h-20 rounded-full bg-neutral-300  "></div>
            <div className="flex flex-col gap-1 w-[70%] ">
                <div className="w-[70%] h-5 bg-neutral-300 rounded-full"></div>
                <div className="w-[70%] h-5 bg-neutral-300 rounded-full"></div>
            </div>
        </div>
        <div className="flex  gap-1 self-end">{
            [1, 2, 3].map(i => (<div className="w-20 h-9 rounded-full bg-neutral-300" key={i}></div>))}
        </div>


    </div>
    return (

        <section className="container">
            {
                isFetching ? fetchLoading : <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-2 w-96 border" >

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
            }


        </section>

    )
}

export default Profile