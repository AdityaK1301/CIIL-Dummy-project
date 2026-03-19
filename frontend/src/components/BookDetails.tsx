'use client'
import { useRouter } from "next/navigation"

type Book = {
  id: number
  title: string
  category: string
  actual_price: number
  coverpage: string
  descr: string
  editor: string
  language: string
  stock: number
  subject: string
  isbn: string
  pages: number
  publisher_year: number
}

export default function BookDetails({ book }: { book: Book }) {
  const router = useRouter()

  const addToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first')
      router.push('/login')
      return
    }

    const res = await fetch("http://127.0.0.1:5006/api/addToCart", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Added space after Bearer
      },
      body: JSON.stringify({
        book_id: book.id,
        qty: 1
      })
    })
    const data = await res.json()
    alert(data.message)
  }

  return (
    <div className="bg-[#f9eedb] py-20 px-10">
      <div className="flex max-w-8xl mx-auto gap-20">
        <img src={`/books/${book.coverpage}`} 
          className="h-120 w-100 object-cover" />
        <div className="text-[#561C24] w-full">
          <h1 className="text-4xl font-bold py-2">{book.title}</h1>
          <hr className="py-4 border-[#561C24]" />
          <div className="w-full gap-3 text-xl flex flex-col">
            <p>Editor: {book.editor}</p>
            <p>Price: ₹{book.actual_price}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Published: {book.publisher_year}</p>
            <p>Language: {book.language}</p>
            <p>Status: {book.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            <p>Subject: {book.subject}</p>
            <p>Pages: {book.pages}</p>
            <p>Description: {book.descr}</p>
          </div>
          <div className="flex gap-4 py-8">
            <button
              onClick={addToCart}
              className="border-2 rounded p-1 border-[#561C24] hover:bg-[#561C24] hover:text-white transition"
            >
              Add to CART
            </button>
            <button className="border-2 rounded p-1 border-[#561C24] hover:bg-[#561C24] hover:text-white transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}