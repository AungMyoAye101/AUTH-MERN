
import { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import { base_url } from '../lib/helper'
import { showToast } from '../context/ToastProvider'
import { User } from '../shared/type'
import { useAuth } from '../context/AuthProvider'

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([])
    const [total, setTotal] = useState(0)
    const totalBannedUsers = users.filter(user => user.isBanned === true)
    const totalUnverifyUsers = users.filter(user => user.isVerified === false)
    const { isAdmin } = useAuth()
    const getUsers = async () => {
        try {
            const res = await fetch(base_url + "/account/users", {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok || data.success === false) {
                showToast("error", data.message)
                return
            }
            console.log(data)
            setUsers(data.users)
            setTotal(data.total)
        } catch (error) {
            if (error instanceof Error) {
                showToast("error", error.message)
                console.error(error.message)
            }
        }
    }
    useEffect(() => {
        getUsers()

    }, [])


    const banUser = async (id: string, type: "unban" | 'ban') => {
        const endpoint = type === "ban" ? "ban" : "unban"
        try {

            const res = await fetch(base_url + "/account/" + endpoint, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id }),
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok || data.success === false) {
                showToast("error", data.message)
                return
            }
            showToast("success", data.message)
            setUsers(pre => pre.map(user => (user._id === id ? { ...user, isBanned: type === "ban" } : user)))
        } catch (error) {
            if (error instanceof Error) {
                showToast("error", error.message)
                console.error(error.message)
            }
        }
    }



    return (
        <section className='mt-4 space-y-4'>
            <div className='flex gap-4'>
                <div className='bg-white shadow-md rounded-lg p-4 flex flex-col  w-52 hover:shadow-xl'>
                    <h2 className='text-neutral-600 font-semibold font-serif'>Totals</h2>
                    <h1 className='font-bold text-3xl text-center '>{total}</h1>
                    <p className='text-neutral-600 font-serif text-end'>users</p>
                </div>

                <div className='bg-white shadow-md rounded-lg p-4 flex flex-col  w-52 hover:shadow-xl'>
                    <h2 className='text-neutral-600 font-semibold font-serif'>Banned
                    </h2>
                    <h1 className='font-bold text-3xl text-center '>{totalBannedUsers.length}</h1>
                    <p className='text-neutral-600 font-serif text-end'>users</p>
                </div>
                <div className='bg-white shadow-md rounded-lg p-4 flex flex-col  w-52 hover:shadow-xl'>
                    <h2 className='text-neutral-600 font-semibold font-serif'>Unverified
                    </h2>
                    <h1 className='font-bold text-3xl text-center '>{totalUnverifyUsers.length}</h1>
                    <p className='text-neutral-600 font-serif text-end'>users</p>
                </div>
            </div>

            <div className='flex gap-4 flex-wrap'>

                {
                    users.map((data) => (<div key={data._id} className='flex items-center justify-between gap-2 bg-white p-2 w-70 rounded-lg hover:shadow-lg border'>
                        <div className='flex items-center gap-2 '>

                            <div className='w-10 h-10 rounded-full bg-purple-400 flex justify-center items-center text-white font-semibold'>{data.name[0]}</div>
                            <div>
                                <p className=' font-semibold'>{data.name}</p>
                                <p className='text-sm font-serif'>{data.email}</p>
                            </div>
                        </div>
                        {
                            isAdmin && <div>
                                {
                                    data.isBanned ? <Button className='bg-neutral-300 text-blue-400 text-sm' onClick={() => banUser(data._id, "unban")}>unban</Button> : <Button className='bg-red-400 text-sm' onClick={() => banUser(data._id, 'ban')}>Ban</Button>
                                }
                            </div>
                        }


                    </div>))
                }
            </div>

        </section>
    )
}

export default Dashboard