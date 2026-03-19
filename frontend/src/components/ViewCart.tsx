'use client'
import {useEffect, useState} from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CartItem = {
    id: number
    title: string
    coverpage: string
    discounted_price: number
    qty: number
}

export default function ViewCart() {
    const [cart, setCart] = useState<CartItem[]>([])

    const increaseQty = async (id:number) => {
        setCart(prev =>
            prev.map(item =>
                item.id == id
                ? {...item, qty: Number(item.qty)+1}
                : item
            )
        )

        const token = localStorage.getItem("token")

        await fetch("http://127.0.0.1:5006/api/updateCartQty", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            book_id: id,
            action: "increase"
            })
        })
    }

    const decreaseQty = async (id:number) => {
        setCart(prev =>
            prev.map(item =>
                item.id == id 
                ? Number(item.qty) > 1
                    ? {...item, qty: Number(item.qty)-1}
                    : (removeItem(id), item)
                :item
            )
        )

        const token = localStorage.getItem("token")

        await fetch("http://127.0.0.1:5006/api/updateCartQty", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            book_id: id,
            action: "decrease"
            })
        })
    }

    const removeItem = async(id: number) => {
        setCart(prev => prev.filter(item => item.id !== id))
        const token = localStorage.getItem('token')
        await fetch("http://127.0.0.1:5006/api/removeFromCart", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            book_id: id
            })
        })
    }
    
    const router = useRouter()

    useEffect(()=>{
        fetchCart()
    }, [])
    const fetchCart = async() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }

        const res = await fetch("http://127.0.0.1:5006/api/viewCart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()
        setCart(data)
    }

    

    const total = cart.reduce(
    (sum, item) => sum + item.discounted_price * item.qty,
    0
  )



  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto flex gap-6">

        {/* LEFT CART */}
        <div className="flex-1 bg-white rounded shadow">

          <div className="bg-[#561C24] text-white px-4 py-3 font-semibold">
            Order Summary
          </div>
          {cart.length == 0 ? (
            <div className='text-center '>
              <div className="text-gray-500 py-10 text-lg">Your cart is empty</div>
              <Link className='underline' href={'/category'}>Continue Shopping</Link>
            </div>
          ):
            (cart.map((item) => (

              <div key={item.id} className="p-6 flex gap-6 border-b">

                <img
                  src={`/books/${item.coverpage}`}
                  className="w-40 h-56 object-cover"
                />

                <div className="flex-1">

                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>

                  <p className="mt-4">
                    ₹ {item.discounted_price} × {item.qty}
                  </p>

                  <button onClick={()=>removeItem(item.id)} className="mt-4 bg-black text-white p-2 rounded">
                    <Trash2 size={16}/>
                  </button>

                </div>

                <div className="flex flex-col items-center gap-3">

                  <p>Quantity</p>

                  <div className="flex items-center border rounded">

                    <button onClick={()=>decreaseQty(item.id)} className="px-4 py-2 border-r">-</button>

                    <div className="px-6 py-2">
                      {item.qty}
                    </div>

                    <button onClick={()=>increaseQty(item.id)} className="px-4 py-2 border-l">+</button>

                  </div>

                  <p className="font-semibold">
                    ₹ {item.discounted_price * item.qty}
                  </p>

                </div>

              </div>

            )))}

        </div>


        {/* RIGHT SUMMARY */}
        <div className="w-80 bg-white rounded shadow h-fit">

          <div className="bg-[#561C24] text-white px-4 py-3 font-semibold">
            Price Summary
          </div>

          <div className="p-6 space-y-4">

            <div className="flex justify-between">
              <span>Products</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total amount</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full bg-[#561C24] text-white py-3 rounded font-semibold">
              <Link href={'/pre_checkout'}> Go to checkout </Link>
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}
