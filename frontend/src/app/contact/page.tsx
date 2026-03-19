'use client'
import React, {useState} from 'react'

export default function page() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleChange = (e:any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(form);
        alert("Msg sent successfully!")
    }

    return (
        <div className='min-h-screen bg-[#f9eedb]'>
            <div className='max-w-7xl mx-auto px-6 py-12'>
                {/* page title */}
                <h1 className='text-4xl font-bold text-[#561C24] 
                mb-12 text-center'>
                    Contact Us
                </h1>
                <div className='grid md:grid-cols-2 gap-12'>
                    <div className="space-y-6">
                        <h2 className='text-2xl font-bold text-[#561C24]'>
                            Get in Touch
                        </h2>
                        <p className='text-gray-700'>
                            If you have any questions about our publications or services,
                            feel free to contact us.
                        </p>
                        <div className='space-y-4'>
                            <div>
                                <h3 className='font-semibold text-[#6D2932]'>Address</h3>
                                <p className='text-gray-700'>
                                    Central Institute of Indian Languages <br />
                                    Manasagangotri, Hunsur Road, Mysuru 570006 <br />
                                    Karnataka, India
                                </p>
                            </div>
                            <div>
                                <h3 className='font-semibold text-[#6D2932]'>Phone</h3>
                                <p className="text-gray-700">
                                +91-821-2345000
                                </p>
                                <p className='text-gray-700'>
                                +91-821-2515182
                                </p>
                            </div>
                            <div>
                                <h3 className='font-semibold text-[#6D2932]'>Fax</h3>
                                <p className="text-gray-700">
                                +91-821-2515032
                                </p>
                            </div>
                            <div>
                                <h3 className='font-semibold text-[#6D2932]'>Email</h3>
                                <p className="text-gray-700">
                                info@ciil.org
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* contact */}
                    <div className='bg-[#561C24] p-8 rounded-xl shadow border'>
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                <label className='block text-[#f9eedb] text-sm font-medium mb-1'>
                                    Name
                                </label>
                                <input name="name" 
                                value={form.name}
                                onChange={handleChange}
                                required
                                className='w-full text-white border rounded-md p-2' />
                            </div>
                            <div>
                                <label className='block text-[#f9eedb] text-sm font-medium mb-1'>
                                    Email
                                </label>
                                <input name="email" 
                                type='email'
                                value={form.email}
                                onChange={handleChange}
                                required
                                className='w-full text-white border rounded-md p-2' />
                            </div>
                            <div>
                                <label className='block text-[#f9eedb] text-sm font-medium mb-1'>
                                    Message
                                </label>
                                <textarea name="message" rows={5} 
                                value={form.message} 
                                onChange={handleChange}
                                required
                                className='w-full text-white border rounded-md p-2'></textarea>
                            </div>
                            <button className="px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100
                            text-[#561C24] text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}