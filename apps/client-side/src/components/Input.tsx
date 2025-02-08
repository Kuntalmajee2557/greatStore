import React, { Dispatch, ForwardedRef, forwardRef, SetStateAction } from 'react'

interface inputProps {
    label: string;
    placeholder: string
}

const Input = React.forwardRef<HTMLInputElement, inputProps>(({label, placeholder, ...inputPorps }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className='flex flex-col gap-2 mt-2'>
            <label htmlFor={label} className='text-2xl text-slate-300 font-semibold'>{label}</label>
            <input id={label} type="text" placeholder={placeholder} className='bg-white/5 border border-white/20 rounded-xl py-3 px-5 text-2xl text-stone-300 outline-none focus-within:border-white focus-within:border-2' ref={ref} {...inputPorps}/>
            
        </div>
    )
})

export default React.memo(Input)