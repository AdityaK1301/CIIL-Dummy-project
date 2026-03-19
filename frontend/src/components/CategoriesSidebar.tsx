import React from 'react'

const CategoriesSidebar = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-bold text-[#561C24] mb-4">
                Catgeories
              </h2>
              <div className="mb-3 flex">
                <h3 className="py-1.5 font-semibold rounded bg-white text-gray-700 text-md focus:outline-none">
                  Subject Type
                </h3>
                <select className="px-1 text-sm focus:outline-none cursor-pointer">
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </div>
              <div className="mb-3 flex">
                <h3 className="py-1.5 font-semibold rounded bg-white text-gray-700 text-md focus:outline-none">
                  Languages
                </h3>
                <select className="px-1 text-sm focus:outline-none cursor-pointer">
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </div>
              <div className="mb-3 flex">
                <h3 className="py-1.5 font-semibold rounded bg-white text-gray-700 text-md focus:outline-none">
                  Publication Type
                </h3>
                <select className="px-1 text-sm focus:outline-none cursor-pointer">
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </div>
            </div>
  )
}

export default CategoriesSidebar