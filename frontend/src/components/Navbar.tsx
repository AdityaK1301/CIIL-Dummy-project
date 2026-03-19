'use client'
import React, { useState, useEffect } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { Search, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    return (
        <>
            {/* Desktop  Header */}
            <div className="bg-[#561C24] text-[#E8D8C4] hidden md:block">
                <div className="container mx-auto px-4 lg:px-8 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image 
                                    src="/logo.png"
                                    alt="CIIL"
                                    width={400}
                                    height={250}
                                    className="w-[300px] lg:w-[320px] xl:w-[400px] h-auto"
                                />
                            </Link>
                        </div>

                        {/* Search Section */}
                        <div className="flex items-center flex-1 max-w-2xl">
                            <select className="h-10 border-2 border-r-0 rounded-l-md px-2 text-sm bg-[#C7B7A3] text-[#6D2932] focus:outline-none">
                                <option>Book Title</option>
                                <option>Author</option>
                                <option>Language</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder="Search for books" 
                                className="h-10 border-2 px-3 flex-1 min-w-[200px] text-sm bg-[#561C24] focus:outline-none"
                            />
                            <Search className="h-10 w-10 bg-[#C7B7A3] text-[#6D2932] rounded-r-md p-2 cursor-pointer hover:bg-[#b5a592]" />
                        </div>

                        {/* Sign In */}
                        <div className="flex gap-4">
                        {loggedIn ? (
                            <button onClick={handleLogout}>
                            Logout
                            </button>
                        ) : (
                            <Link href={"/signup"} className="flex items-center gap-2 hover:opacity-80 cursor-pointer whitespace-nowrap">
                                <User className="flex h-5 w-5" />
                                <span className="text-sm hidden lg:inline">Sign In / Sign Up</span>
                            </Link>
                        )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Yellow Navbar */}
            <div className="bg-[#ede2d4ce] text-[#6D2932] hidden md:block sticky top-0 z-40 shadow-md backdrop-blur-md">
                <div className="container mx-auto px-4 lg:px-8">
                    <DesktopNav />
                </div>
            </div>

            {/* Mobile Nav */}
            <MobileNav 
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
        </>
    )
}

export default Navbar