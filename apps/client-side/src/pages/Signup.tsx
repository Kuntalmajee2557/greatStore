import React from 'react'
import Button from '../components/Button'
import Plus from '../Icons/Plus'
import { Link } from 'react-router-dom'
import Input from '../components/Input'

function Signup() {
  return (
    <div className='w-full h-screen flex justify-center items-center' style={{background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)"}}>
      <div className='bg-white/5 w-1/4 h-4/6 rounded-2xl border border-white/30 p-10 flex flex-col gap-10'>
        <h1 className='text-7xl font-bold text-white'>Signup</h1>
        <Input label='Username'/>
        <Input label='Password'/>
        <div className='w-full h-1/5 flex flex-col justify-end gap-3'>
        <button className='bg-black text-white p-5 rounded-2xl w-full text-2xl font-semibold hover:border-white/80'>Signup</button>
        <p className='text-center text-white/45 text-xl'>already have an account? <Link to="/signin" className='underline font-bold text-blue-800'>Sign in</Link></p>
        </div>

      </div>
    </div>



  )
}

export default Signup