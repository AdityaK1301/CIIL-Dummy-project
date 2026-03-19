import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils"; // Make sure you have this utility

export async function Section1() {
  
  const books: Book[] = await fetch('http://127.0.0.1:5006/api/bookData').then(res => res.json())

  type Book = {
  id: number;
  title: string;
  category: string;
  actual_price: number;
  coverpage: string;
  subject: string;
};

  return (
    <section id="recommended" className="w-full py-10 bg-white px-4 sm:px-6 lg:px-8">
      <div  className="md:mx-15 mx-10">
        <hr className="py-4 border-[#561C24]"/>
        <h2  className="
            text-5xl
            w-fit
            bg-clip-text
            text-transparent
            py-8 px-2
            bg-gradient-to-br
            from-[#341418]
            to-[#873741]
            font-extrabold">
          
          Recommended Books
          
        </h2>
        
        <div className="flex overflow-x-auto gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={cn(
                "group min-w-[260px] sm:min-w-0 w-full cursor-pointer overflow-hidden relative card h-70 rounded-md shadow-xl mx-auto flex flex-col justify-end p-5 border-transparent",
                "bg-cover transition-all duration-500",
                `bg-[url(/books/${book.coverpage})]`,
                "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
                "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50"
              )}
              style={{
                backgroundImage: `url(/books/${book.coverpage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-b object-cover from-black/80 via-black/50 to-transparent z-0" />
              
              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 pb-2">
                  <BookOpen className="h-4 w-4 text-[#C7B7A3]" />
                  <h3 className="font-bold text-sm tracking-wider">
                    {book.subject}
                  </h3>
                </div>
                
                <p className="text-sm font-bold mb-3 line-clamp-2 text-white">
                  {book.title}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg ">₹{book.actual_price}</span>
                  <button className="text-xs bg-[#C7B7A3] text-[#6D2932] px-3 py-1.5 rounded font-semibold hover:bg-white transition-colors">
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}