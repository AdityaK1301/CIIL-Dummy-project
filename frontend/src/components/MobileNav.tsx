'use client'
import React, {useState, useEffect} from 'react'
import { Menu, X, Search, User, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type MobileNavProps = {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (value: boolean) => void
}

const MobileNav = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavProps) => {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
          const token = localStorage.getItem("token")
  
          if(token){
          setLoggedIn(true)
          }
      }, [])

  const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.reload()
    }
  
    const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Category', path: '/category' },
    { name: 'Language', path: '/language' },
    { name: 'Library', path: 'http://library.ciil.org:8080/search/query?theme=ciil' },
    { name: 'Contact', path: '/contact' }
]

    return (
      <div className="md:hidden">
        {/* Blue Header */}
        <div className="bg-[#561C24] text-[#E8D8C4] px-4 py-3">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="CIIL"
                width={400}
                height={250}
                className="h-auto w-[400px]"
              />
            </Link>
          </div>

          {/* Search Row */}
          <div className="flex items-center sm:gap-2">
            <div className="flex flex-1 items-center">
              <select className="h-8 border-2 border-r-0 rounded-l-md text-xs bg-[#C7B7A3] text-[#6D2932] focus:outline-none">
                <option>Title</option>
                <option>Author</option>
                <option>Language</option>
              </select>
              <input
                type="text"
                placeholder="Search books..."
                className="h-8 border-2 px-2 flex-1 text-xs bg-[#561C24] focus:outline-none"
              />
              <Search className="h-8 w-8 bg-[#C7B7A3] text-[#561C24] rounded-r-md p-1.5" />
            </div>
            <div className="flex gap-4">
              {loggedIn ? (
                  <button onClick={handleLogout}>
                  Logout
                  </button>
              ) : (
            <Link href={'/signup'} className="flex items-center justify-center px-1 py-1 rounded-md cursor-pointer hover:bg-[#6D2932] transition-colors">
              <User className="h-5 w-5 ml-0.5 text-[#E8D8C4]" />
            </Link>
            )}

            </div>
          </div>
        </div>

        {/* Yellow Navbar */}
        <div className="bg-[#C7B7A3] text-[#6D2932] px-4 py-2 flex justify-between items-center sticky top-0 z-40">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-1">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <select className="border px-2 py-1 rounded text-xs bg-white">
              <option>English</option>
              <option>Hindi</option>
            </select>
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-[#561C24] z-50 transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="relative h-full overflow-y-auto">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
              <div className="w-full max-w-sm space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center text-xl text-white hover:text-[#C7B7A3] py-4 border-b border-white/20"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MobileNav