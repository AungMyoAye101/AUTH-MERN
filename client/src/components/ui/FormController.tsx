type InputType = {
    data?: any,
    disable?: boolean
    type: string,
    name: string,
    id: string,
    placeholder: string,
    style?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: any

}

const FormController = ({ data, disable, type = 'text', name, id, placeholder, onChange, style, icon }: InputType) => {
    return (
        <label htmlFor={id} className={`h-10 w-full flex items-center  bg-neutral-200 rounded-lg text-sm overflow-hidden ${style}`}>
            {
                icon && <span>{icon}</span>
            }
            <input value={data} disabled={disable ? true : false} type={type} name={name} id={id} onChange={onChange} placeholder={placeholder} className="w-full h-full border-none focus:outline-none bg-transparent ml-2 " />
        </label>
    )
}

export default FormController