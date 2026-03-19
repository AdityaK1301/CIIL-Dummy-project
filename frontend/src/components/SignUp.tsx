'use client'
import React, {useState} from 'react'
import { useRouter } from "next/navigation";

function SignUp() {

    const router = useRouter()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        account_type: ""
    })

    const handleChange = (e:any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        const res = await fetch("http://localhost:5006/api/create_user", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        if(data.status === "success"){
            router.push('/login')
        }
        alert(data.message)
    }

  return (
    <form onSubmit={handleSubmit} className='justify-center items-center flex flex-col gap-4'>

        <input name='name'
        placeholder='Name'
        onChange={handleChange}
        className='rounded-lg border p-2' />

        <input name='email'
        placeholder='Email'
        onChange={handleChange}
        className='rounded-lg border p-2' />

        <input name='password'
        placeholder='Password'
        onChange={handleChange}
        className='rounded-lg border p-2' />

        <input name='mobile'
        placeholder='Mobile'
        onChange={handleChange}
        className='rounded-lg border p-2' />

        <select 
        name='account_type'
        onChange={handleChange}
        className='rounded-lg border p-2'>
            <option value="" disabled>Select account type</option>
            <option value="Personal">Personal</option>
            <option value="Organisation">Organisation</option>
        </select>

        <button className="px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100
         text-[#561C24] text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
            Sign Up
        </button>

    </form>
  )
}

export default SignUp