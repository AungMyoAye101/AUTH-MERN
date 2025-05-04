
import { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import { base_url } from '../lib/helper'
import { showToast } from '../context/ToastProvider'
import { User } from '../shared/type'

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([])
    const [total, setTotal] = useState(0)

    const getUsers = async () => {
        try {
            const res = await fetch(base_url + "/auth/users", {
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


    const banned = async (id: string) => {
        try {
            const res = await fetch(base_url + "/account/ban", {
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
            console.log(data)
        } catch (error) {
            if (error instanceof Error) {
                showToast("error", error.message)
                console.error(error.message)
            }
        }
    }
    const unbanned = async (id: string) => {
        try {
            const res = await fetch(base_url + "/account/unbanned", {
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
            console.log(data)
        } catch (error) {
            if (error instanceof Error) {
                showToast("error", error.message)
                console.error(error.message)
            }
        }
    }


    return (
        <section className='mt-4 space-y-4'>
            <div className='bg-white shadow-md rounded-lg p-4 flex flex-col  w-52 hover:shadow-xl'>
                <h2 className='text-neutral-600 font-semibold font-serif'>Totals</h2>
                <h1 className='font-bold text-3xl text-center '>{total}</h1>
                <p className='text-neutral-600 font-serif text-end'>users</p>
            </div>
            <div className='flex gap-4 flex-wrap'>

                {
                    users.map((data, i) => (<div className='flex items-center justify-between gap-2 bg-white p-2 w-70 rounded-lg hover:shadow-lg border'>
                        <div className='flex items-center gap-1 ' key={i}>

                            <div className='w-10 h-10 rounded-full bg-purple-400 flex justify-center items-center text-white font-semibold'>{data.name[0]}</div>
                            <div>
                                <p className=' font-semibold font-serif'>{data.name}</p>
                                <p className='text-xs -mt-1'>{data.email}</p>
                            </div>
                        </div>
                        {
                            data.isBanned ? <Button className='bg-neutral-300 text-blue-400 text-sm' onClick={() => unbanned(data._id)}>Ban</Button> : <Button className='bg-red-400 text-sm' onClick={() => banned(data._id)}>Ban</Button>
                        }

                    </div>))
                }
            </div>

        </section>
    )
}

export default Dashboard