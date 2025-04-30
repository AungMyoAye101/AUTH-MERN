import { useState } from "react"
import Form from "../components/ui/Form"
import FormController from "../components/ui/FormController"
import { updateUser } from "../lib/helper"
import { useAuth } from "../context/AuthProvider"


const UpdateUser = () => {
    const [data, setData] = useState({
        name: "",
        email: ""
    })
    const [error, setError] = useState('')
    const { id } = useAuth()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((pre) => ({ ...pre, [name]: value }))
    }
    return (
        <section className='container'>
            <Form endpoint={`/auth/update/${id}`} redirect="/" method="PUT" data={data} error={error} setError={setError} headingText="Update Account" >
                {
                    updateUser.map(fields => (
                        <FormController name={fields.name} id={fields.id} type={fields.type} onChange={onChange} placeholder={fields.placeholder} icon={fields.icon} />
                    ))
                }

            </Form>

        </section>
    )
}

export default UpdateUser