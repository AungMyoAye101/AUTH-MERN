type InputType = {
    data?: any,
    disable?: boolean
    type: string,
    name: string,
    id: string,
    placeholder: string,
    style?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const FormController = ({ data, disable, type = 'text', name, id, placeholder, onChange, style }: InputType) => {
    return (
        <label htmlFor={id}>
            <input value={data} disabled={disable ? true : false} type={type} name={name} id={id} onChange={onChange} placeholder={placeholder} className={`h-10 px-4 w-full border focus:outline-none bg-gray-100 rounded-lg ${style}`} />
        </label>
    )
}

export default FormController