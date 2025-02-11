import React, { useState } from 'react'
import Button from '../components/Button'
import Plus from '../Icons/Plus'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import axios from 'axios'

interface IFormInput {
  username: string
  password: string
}

function Signin() {
  const navigate = useNavigate()
  const [error, setError] = useState<any>("");
  const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>()

  async function handleSingin(formData: IFormInput) {
    try {
      setError("");
      await axios({
        url:`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
        method: "POST",
        data: formData
      })
      .then((res) => {
        console.log(res)
        console.log(res.status)
        navigate("/dashboard", {state: { token: res.data.token }})
      })
      
    } catch (error) {
      setError(error)
    }

  }

  return (
    <div className='w-full h-screen flex justify-center items-center' style={{ background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)" }}>
      <div className='bg-white/5 w-1/4 h-5/8 rounded-2xl border border-white/30 p-10 flex flex-col gap-10'>
        <h1 className='text-5xl font-bold text-white'>Signin</h1>
        <form onSubmit={handleSubmit(handleSingin)}>
          <Input label="Username" placeholder='kuntal2557' {...register("username", {
            required: "Enter username"
          })} />
          {errors.username && (
            <span className="text-red-500 text-md mt-1">{errors.username.message}</span>
          )}
          <Input label="Password" placeholder='Kuntal@123' {...register("password", {
            required: "Enter password"
          })} />
          {errors.password && (
            <span className="text-red-500 text-md mt-1">{errors.password.message}</span>
          )}
          <div className='w-full h-1/5 flex flex-col justify-end gap-3 relative top-24'>
            <button type='submit' className='bg-black text-white p-5 rounded-2xl w-full text-2xl font-semibold hover:border-white/80'>Signin</button>
            <p className='text-center text-white/45 text-xl'>don't have an account? <Link to="/signup" className='underline font-bold text-blue-800'>Signup</Link></p>
          </div>
        </form>
      </div>
    </div>



  )
}

export default Signin