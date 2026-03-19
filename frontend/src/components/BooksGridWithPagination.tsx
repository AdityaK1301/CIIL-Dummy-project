'use client'
import React, {useState} from 'react'
import { Pagination, PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious, } from "@/components/ui/pagination";
import Link from 'next/link';

type Book = {
  id: number;
  title: string;
  category: string;
  actual_price: number;
  coverpage: string;
  subject: string;
};

function BooksGridWithPagination({books}:{books:Book[]}) {
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 8
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(books.length / booksPerPage)
    
  return (
    <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#561C24] mb-8">
              Books
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 pb-2 gap-10">
              {currentBooks.map((book) => (
                <div key={book.id}
                className="group bg-[#561C24] rounded-xl shadow-sm
                hover:shadow-xl transition duration-300 overflow-hidden">
                  {/* image */}
                  <div className="bg-[#f9eedb] flex items-center justify-center
                  overflow-hidden">
                    <img src={`/books/${book.coverpage}`} alt={book.title} 
                    className="h-full object-contain group-hover:scale-105 transition"/>
                  </div>
                  {/* content */}
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-100 line-clamp-2">
                      {book.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-md font-bold text-gray-100">
                        ₹{book.actual_price}
                      </span>
                      <Link href={`/description/${book.id}`}>
                        <span className="text-xs bg-[#561C24] text-white px-3
                        py-1.5 rounded-md hover:bg-[#6D2932] transition">
                          Details
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={()=>
                    setCurrentPage((prev)=>
                    Math.max(prev-1,1))
                  } />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index)=>{
                  const page = index+1
                  return(
                    <PaginationItem key={page}>
                      <PaginationLink
                      isActive={currentPage === page}
                      onClick={()=>setCurrentPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
                <PaginationItem>
                  <PaginationNext
                  onClick={()=>setCurrentPage((prev)=>
                  Math.min(prev+1, totalPages))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> 
  )
}

export default BooksGridWithPagination