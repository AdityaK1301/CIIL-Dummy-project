'use client'
import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from "lucide-react";

const DesktopNav = () => {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/aboutus' },
        { name: 'Category', path: '/category' },
        { name: 'Language', path: '/language' },
        { name: 'Library', path: 'http://library.ciil.org:8080/search/query?theme=ciil' },
        { name: 'Contact', path: '/contact' }
    ]
    
    return (
        <div className="flex items-center justify-between py-3">
            <ul className="flex gap-6 lg:gap-8 xl:gap-10 font-medium">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link 
                            href={item.path}
                            className="text-sm lg:text-base hover:text-[#561C24] transition-colors"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-4">
                <select className="border px-3 py-1.5 rounded bg-white text-sm focus:outline-none cursor-pointer">
                    <option>English</option>
                    <option>Hindi</option>
                </select>
                <Link href={'/cart'}>
                    <ShoppingCart className="h-5 w-5 cursor-pointer hover:text-[#561C24]" />
                </Link>
            </div>
        </div>
    )
}

export default DesktopNav