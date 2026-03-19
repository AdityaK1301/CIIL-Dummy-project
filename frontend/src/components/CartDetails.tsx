import React from 'react'
import { Trash2 } from "lucide-react";

function CartDetails() {
  return (
    <div className="bg-[#f9eedb] p-5">
      <div className="max-w-8xl mx-auto flex gap-6">

        {/* LEFT SECTION */}
        <div className="flex-1 bg-white rounded shadow">
          
          {/* header */}
          <div className="bg-[#0B2D5C] text-white px-4 py-3 font-semibold">
            Order Summary
          </div>

          {/* product */}
          <div className="p-6 flex gap-6 border-b">

            {/* book image */}
            <img
              src="/books/gujarati.jpg"
              className="w-40 h-56 object-cover"
            />

            {/* book details */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                An Intensive Course in Gujarati
              </h2>

              <p className="text-gray-700 mt-2">
                Subject : Basic Intensive Courses
              </p>

              <p className="text-gray-700">
                Publisher Year : 2009
              </p>

              <div className="flex items-center gap-4 mt-6">

                {/* delete button */}
                <button className="bg-green-600 text-white p-2 rounded">
                  <Trash2 size={16}/>
                </button>

              </div>
            </div>

            {/* quantity section */}
            <div className="flex flex-col items-center gap-3">

              <p className="text-gray-700">Quantity</p>

              <div className="flex items-center border rounded overflow-hidden">
                <button className="px-4 py-2 border-r">-</button>
                <div className="px-6 py-2">1</div>
                <button className="px-4 py-2 border-l">+</button>
              </div>

              <p className="font-semibold">
                ₹ 300 X 1 = ₹ 300
              </p>

            </div>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-80 bg-white rounded shadow h-fit">

          {/* header */}
          <div className="bg-[#0B2D5C] text-white px-4 py-3 font-semibold">
            Price Summary
          </div>

          <div className="p-6 space-y-4">

            <div className="flex justify-between text-gray-700">
              <span>Products</span>
              <span>₹300</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total amount</span>
              <span>₹300</span>
            </div>

            <button className="w-full bg-[#0B2D5C] text-white py-3 rounded font-semibold">
              Go to checkout
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CartDetails