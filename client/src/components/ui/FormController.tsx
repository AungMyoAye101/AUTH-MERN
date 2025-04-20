type InputType = {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    style?: string,
    onChange: (e: React.ChangeEvent) => void

}

const FormController = ({ type = 'text', name, id, placeholder, onChange, style }: InputType) => {
    return (
        <label htmlFor={id}>
            <input type={type} name={name} id={id} onChange={onChange} placeholder={placeholder} className={`h-8 p-2 w-full border focus:outline-none bg-neutral-100 rounded-lg ${style}`} />
        </label>
    )
}

export default FormController