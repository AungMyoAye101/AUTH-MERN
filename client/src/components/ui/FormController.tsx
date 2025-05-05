
import { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type InputType = {
    label?: string,
    register?: UseFormRegister<any>,
    error?: FieldError,
    type: string,
    name: string,
    placeholder: string,
    className?: string,
    icon?: string,
    defaultValue?: string,

}

const FormController = ({ label, type = 'text', name, placeholder, className, icon, register, error, defaultValue }: InputType) => {
    const [show, setshow] = useState(false)

    let inputType = type;
    if (type === 'password') {
        if (show) {
            inputType = 'text'
        }
    }


    return (
        <div className={` overflow-hidden  ${className} `}>
            <label htmlFor="name" className='text-sm font-serif opacity-80 text-neutral-700'>{label}</label>

            <div className={`h-10 w-full flex items-center  bg-neutral-200 rounded-lg text-sm px-2 `}>

                {
                    icon && <img src={icon} alt="icon" className='w-5 ' />
                }


                <input type={inputType} defaultValue={defaultValue} id={name} {...(register ? register(name) : {})} placeholder={placeholder} className='w-full h-full border-none focus:outline-none bg-neutral-200 ml-2' />
                {
                    type === 'password' && (<>

                        <img src={show ? "/assets/eye.svg" : "/assets/eye-slash.svg"} alt="eye icon" className='w-5 cursor-pointer' onClick={() => setshow(pre => !pre)} />


                    </>)}
            </div>

            {
                error && <p className='text-sm text-red-400 mt-1'>{error.message}</p>
            }

        </div>
    )
}

export default FormController