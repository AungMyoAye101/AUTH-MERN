
import { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type InputType = {
    register?: UseFormRegister<any>,
    error?: FieldError,
    type: string,
    name: string,
    placeholder: string,
    className?: string,
    icon?: string

}

const FormController = ({ type = 'text', name, placeholder, className, icon, register, error }: InputType) => {
    const [show, setshow] = useState(false)

    let inputType = type;
    if (type === 'password') {
        if (show) {
            inputType = 'text'
        }
    }


    return (
        <label htmlFor={name} className={` overflow-hidden  ${className}`}>

            <div className='h-10 w-full flex items-center  bg-neutral-200 rounded-xl text-sm px-2 '>

                {
                    icon && <img src={icon} alt="icon" className='w-5 ' />
                }


                <input type={inputType} id={name} {...(register ? register(name) : {})} placeholder={placeholder} className="w-full h-full border-none focus:outline-none bg-transparent ml-2 " />
                {
                    type === 'password' && (<>

                        <img src={show ? "/assets/eye.svg" : "/assets/eye-slash.svg"} alt="eye icon" className='w-5 cursor-pointer' onClick={() => setshow(pre => !pre)} />


                    </>)}
            </div>

            {
                error && <p className='text-sm text-red-400 mt-1'>{error.message}</p>
            }

        </label>
    )
}

export default FormController