import BooksGridWithPagination from "@/components/BooksGridWithPagination";
import CategoriesSidebar from "@/components/CategoriesSidebar";
import Link from "next/link";


export default async function BooksPage() {

  const books = await fetch("http://127.0.0.1:5006/api/bookData",{ cache: "no-store" }).then(res => res.json())

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-8xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            {/* categories here */}
            <CategoriesSidebar />
          </div>
             {/* books grid */}
            <BooksGridWithPagination books={books} />
        </div>  
      </div>  
    </div>  
  );
}