'use client'
import React, { useState, useEffect } from 'react'

type AddressForm = {
  name: string
  email: string
  mobile: string
  address: string
  country: string
  state: string
  district: string
  pincode: string
  add_type: string
}

type CartItem = {
  id: number
  title: string
  coverpage: string
  discounted_price: number
  qty: number
}

function page() {

  const [form, setForm] = useState<AddressForm>({
    name: "",
    email: "",
    mobile: "",
    address: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    add_type: ""
  })

  // ✅ HANDLE INPUT
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // ✅ FETCH ADDRESS (AUTO-FILL)
  useEffect(() => {
    fetchCart()
    fetchAddress()
  }, [])

  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCart = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    const res = await fetch("http://127.0.0.1:5006/api/viewCart", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    setCart(data)
    setLoading(false)
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.discounted_price * item.qty,
    0
  )
  const shipping = 142
  const handling = 20
  const total = subtotal + shipping + handling

  const fetchAddress = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    const res = await fetch("http://127.0.0.1:5006/api/getAddress", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    

    const data = await res.json()

    if (data && data.name) {
      setForm({
        name: data.name || "",
        mobile: data.mobile || "",
        email: data.email || "",
        address: data.address || "",
        country: "", // not in DB
        state: data.state || "",
        district: data.district || "",
        pincode: data.pincode || "",
        add_type: data.add_type || ""
      })
    }
  }

  // ✅ SUBMIT
  const handleSubmit = async () => {
  const token = localStorage.getItem("token")

  const res = await fetch("http://127.0.0.1:5006/api/createInvoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ...form,
      subtotal,
      shipping,
      handling,
      total
    })
  })

  const data = await res.json()

  if (data.status === "success") {
    window.location.href = `/invoice/${data.invoice_no}`
  } else {
    alert(data.message)
  }
}

  return (
    <div className='bg-white w-full p-6'>
      <div className='flex flex-col lg:flex-row gap-6 mx-auto'>

        {/* LEFT - ADDRESS */}
        <div className='flex-1 bg-white rounded shadow'>

          <div className='bg-[#561C24] text-white px-4 py-3 font-semibold'>
            ADDRESS
          </div>

          <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>

            <div>
              <label>Full Name <span className='text-red-500'>*</span></label>
              <input name="name" value={form.name} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div>
              <label>Mobile <span className='text-red-500'>*</span></label>
              <input name="mobile" value={form.mobile} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div>
              <label>Email <span className='text-red-500'>*</span></label>
              <input name="email" value={form.email} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div className=''>
              <label>Address <span className='text-red-500'>*</span></label>
              <input name="address" value={form.address} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div>
              <label>Country <span className='text-red-500'>*</span></label>
              <input name="country" value={form.country} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div>
              <label>State <span className='text-red-500'>*</span></label>
              <input name="state" value={form.state} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div>
              <label>District</label>
              <input name="district" value={form.district} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1" />
            </div>

            <div>
              <label>Pincode <span className='text-red-500'>*</span></label>
              <input name="pincode" value={form.pincode} onChange={handleChange}
                className="border w-full px-3 py-2 rounded mt-1 required" />
            </div>

            <div className='md:col-span-2'>
              <label>Address Type <span className='text-red-500'>*</span></label>
              <div className='flex gap-6 mt-2 required'>

                <label>
                  <input type="radio" name="add_type" value="Home"
                    checked={form.add_type === "Home"}
                    onChange={handleChange} /> Home
                </label>

                <label>
                  <input type="radio" name="add_type" value="Office"
                    checked={form.add_type === "Office"}
                    onChange={handleChange} /> Office
                </label>

              </div>
            </div>

          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className='w-full lg:w-96 bg-white rounded shadow h-fit'>

          <div className='bg-[#561C24] text-white px-4 py-3 font-semibold'>
            SUMMARY
          </div>

          <div className='p-6 space-y-4'>

            {/* Product list */}
            {/* {cart?.length > 0 && (
            <div className='border-b pb-3 mb-2'>
                <p className='font-semibold mb-2'>Products:</p>
                {cart.map((item) => (
                <div key={item.id} className='flex justify-between text-sm mb-1'>
                    <span className='truncate max-w-[180px]'>
                    {item?.title ? (item.title.substring(0, 30) + '...') : 'Product'}
                    </span>
                    <span>₹{item?.discounted_price || 0} x {item?.qty || 0}</span>
                </div>
                ))}
            </div>
            )} */}

            <div className='flex justify-between'>
              <span>Products</span>
              <span>₹{subtotal}</span>
            </div>

            <div className='flex gap-2'>
              <input className='border px-3 py-2 rounded w-full'
                placeholder='Discount code' />
              <button className='bg-[#561C24] text-white px-4 rounded'>
                Apply
              </button>
            </div>

            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className='flex justify-between'>
              <span>Handling</span>
              <span>₹{handling}</span>
            </div>

            <div className='flex justify-between font-semibold border-t pt-3'>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleSubmit}
              className='w-full bg-[#561C24] text-white py-3 rounded font-semibold'>
              Submit
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default page