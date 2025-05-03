import { useState } from "react"
import FormController from "../components/ui/FormController"
import { base_url, updateUser } from "../lib/helper"
import { useAuth } from "../context/AuthProvider"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { showToast } from "../context/ToastProvider"
import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

const updateUserSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name must contain at least one character"),
    email: z.string().email("Invalid email")
})

type updateUserType = z.infer<typeof updateUserSchema>
const UpdateUser = () => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { id, name, email, fetchUser } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            id: id || '',
            name: name || '',
            email: email || ''
        }
    })

    const submitHandle = async (data: updateUserType) => {
        setLoading(true)
        try {
            const res = await fetch(base_url + `/auth/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            const response = await res.json()
            if (!res.ok || response.success === false) {

                setError(response.message)
                showToast("error", response.message)
            }
            showToast("success", response.message)
            fetchUser()
            navigate(`/user/${id}`)

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='container'>
            <form onSubmit={handleSubmit(submitHandle)} className="form_container" >
                {
                    updateUser.map(fields => (
                        <FormController key={fields.id} defaultValue={fields.name} name={fields.name} type={fields.type} placeholder={fields.placeholder} icon={fields.icon} register={register} error={errors[fields.name as keyof updateUserType]} />
                    ))
                }
                <Button type="submit" loading={loading}>Update</Button>
                {
                    error && <p className="error_message">{error}</p>
                }
            </form>

        </section>
    )
}

export default UpdateUser