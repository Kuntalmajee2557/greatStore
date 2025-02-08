import React, { useState } from 'react'
import Button from '../components/Button'
import Plus from '../Icons/Plus'
import { data, ErrorResponse, Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import axios from 'axios'
import { useForm } from 'react-hook-form'

interface IFormInput {
  username: string
  password: string
}

function Signup() {
  // const [username, setUsername] = useState<string>("")
  // const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()
  const [error, setError] = useState<any>("");
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

  async function handleSingup(formData: IFormInput) {
    try {
      setError("");
      await axios({
        url:"http://localhost:3000/api/v1/user/signup",
        method: "POST",
        data: formData
      })
      .then((res) => {
        console.log(res)
        console.log(res.status)
        navigate("/signin")
      })
      
    } catch (error) {
      setError(error)
    }

  }
  return (
    <div className='w-full h-screen flex justify-center items-center' style={{ background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)" }}>
      <div className='bg-white/5 w-1/4 h-5/8 rounded-2xl border border-white/30 p-10 flex flex-col gap-10'>
        <h1 className='text-5xl font-bold text-white'>Signup</h1>

        <form onSubmit={handleSubmit(handleSingup)}>
          <Input label='Username' placeholder="Kuntal2557" {...register("username", {
            required: "Enter username",
            minLength: {
              value: 3,
              message: "please enter atleast 3 charecter"
            },
            maxLength: {
              value: 20,
              message: "enter atmost 20 charecter"
            }
          })} />
          {errors.username && (
            <span className="text-red-500 text-md mt-1">{errors.username.message}</span>
          )}

          <Input label='Password' placeholder="Kuntal@123" {...register("password", {
            required: "Enter password",
            minLength: {
              value: 8,
              message: "please enter atleast 8 charecter"
            },
            maxLength: {
              value: 20,
              message: "enter atmost 20 charecter"
            }
          })} />
          {errors.password && (
            <span className='text-red-500 text-md mt-1' >{errors.password.message}</span>
          )}
          <div className='w-full h-1/5 flex flex-col justify-end gap-3 relative top-24'>
            <button className='bg-black text-white p-5 rounded-2xl w-full text-2xl font-semibold hover:border-white/80' type='submit'>Signup</button>
            <p className='text-center text-white/45 text-xl'>already have an account? <Link to="/signin" className='underline font-bold text-blue-800'>Signin</Link></p>
          </div>
        </form>
      </div>
    </div>



  )
}

export default Signup