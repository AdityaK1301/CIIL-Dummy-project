"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function page() {

  const [pincode, setPincode] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  const handleSubmit = () => {
    if (pincode.trim() !== "") {
      setShowOptions(true)
    }
  }

  return (
    <div className='bg-white md:py-24 px-8 py-12'>
      <div className='mx-auto border rounded'>

        {/* Header */}
        <div className='bg-[#561C24] text-white text-3xl px-4 py-3 font-semibold'>
          Pincode
        </div>

        {/* Form */}
        <div className='p-6 flex flex-col md:flex-row items-center gap-6'>

          <div className='flex flex-col w-full md:w-1/3'>
            <label className='font-semibold mb-1'>
              Select Delivery Type
            </label>
            <select className='border rounded px-3 py-2'>
              <option>Domestic</option>
            </select>
          </div>

          <div className='flex flex-col w-full md:w-1/3'>
            <label className='font-semibold mb-1'>
              Enter Pincode
            </label>
            <input
              type='text'
              placeholder='Enter Pincode'
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className='border rounded px-3 py-2'
            />
          </div>

          <div className='mt-5 md:mt-6'>
            <button
              onClick={handleSubmit}
              className='bg-[#561C24] text-white px-5 py-2 rounded'
            >
              Submit
            </button>
          </div>

        </div>

        {/* DELIVERY OPTION (appears after submit) */}
        {showOptions && (
          <Link href={'/checkout'}>
            <div className='m-6 p-4 border rounded shadow cursor-pointer hover:bg-gray-100'>

              <div className='flex items-center gap-2'>
                <input type='radio' />
                <span className='font-semibold'>India Post</span>
              </div>

              <p className='text-red-600 font-semibold mt-2'>
                Charges - ₹ 142.00
              </p>

              <p className='mt-1'>
                <span className='font-semibold'>Estimated Delivery</span> - Aug 12, 2025
              </p>

            </div>
          </Link>
        )}

      </div>
    </div>
  )
}

export default page