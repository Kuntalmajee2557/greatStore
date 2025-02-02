import React from 'react'

interface inputProps {
    label: string;
}

function Input({label}: inputProps) {
    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="password" className='text-2xl text-white/80 font-semibold'>{label}</label>
            <input id="password" type="text" className='bg-white/5 border border-white/20 rounded-xl py-3 px-5 text-2xl text-slate-200' />
        </div>
    )
}

export default Input