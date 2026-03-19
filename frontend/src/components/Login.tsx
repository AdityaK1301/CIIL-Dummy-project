'use client'
import React, {useState} from 'react'
import { useRouter } from "next/navigation";

function Login() {

    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e:any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5006/api/login_users",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        if(data.status === "success"){
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                window.location.href = '/'
            }
        alert(data.message)
    }

  return (
    <form onSubmit={handleSubmit} className='justify-center items-center flex flex-col gap-4'>

        <input name='email'
        placeholder='Email'
        onChange={handleChange} 
        className='rounded-lg border p-2'/>

        <input name='password'
        placeholder='Password'
        onChange={handleChange} 
        className='rounded-lg border p-2'/>

        <button className="px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100
         text-[#561C24] text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
            Login
        </button>

    </form>
  )
}

export default Login