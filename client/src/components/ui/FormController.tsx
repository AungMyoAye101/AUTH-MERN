
import { useState } from 'react';

type InputType = {
    data?: any,
    disable?: boolean
    type: string,
    name: string,
    id: string,
    placeholder: string,
    style?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: string

}

const FormController = ({ data, disable, type = 'text', name, id, placeholder, onChange, style, icon }: InputType) => {
    const [show, setshow] = useState(false)

    let inputType = type;
    if (type === 'password') {
        if (show) {
            inputType = 'text'
        }
    }


    return (
        <label htmlFor={id} className={`h-10 w-full flex items-center  bg-neutral-200 rounded-lg text-sm overflow-hidden ${style} px-2`}>

            {
                icon && <img src={icon} alt="icon" className='w-5 ' />
            }


            <input value={data} disabled={disable ? true : false} type={inputType} name={name} id={id} onChange={onChange} placeholder={placeholder} className="w-full h-full border-none focus:outline-none bg-transparent ml-2 " />
            {
                type === 'password' && (<>

                    <img src={show ? "/assets/eye.svg" : "/assets/eye-slash.svg"} alt="eye icon" className='w-5 cursor-pointer' onClick={() => setshow(pre => !pre)} />


                </>)}

        </label>
    )
}

export default FormController