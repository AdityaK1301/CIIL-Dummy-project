"use client";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className='w-full bg-[#561C24] py-4'>
      <div className='max-w-8xl mx-auto pb-4 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-[#E8D8C4] text-lg font-medium'>
            Get connected with us on social networks:
          </p>
          <div className='flex items-center gap-8'>
            <Link href="#" className='text-[#C7B7A3] hover:text-white transition-colors' aria-label='Facebook'>
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} className="h-5 w-5 brightness-0 invert"></Image>
            </Link>
            <Link href="#" className='text-[#C7B7A3] hover:text-white transition-colors' aria-label='Youtube'>
            <Image src="/youtube.svg" alt="Youtube" width={20} height={20} className="h-5 w-5 brightness-0 invert"></Image>
            </Link>
            <Link href="#" className='text-[#C7B7A3] hover:text-white transition-colors' aria-label='X'>
            <Image src="/x.svg" alt="X" width={20} height={20} className="h-5 w-5 brightness-0 invert"></Image>
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-full "/>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12 justify-center">
          <div className="col-span-1">
            <Link href="#">
            <Image src="/logo.png" alt="Logo" width={400} height={250} className="w-[400px] lg:w-[400px] xl:w-[400px]"></Image></Link>
          </div>
          <div className="col-span-1 lg:ms-18">
            <h3 className="text-[#E8D8C4] font-semibold text-lg mb-4">IMPORTANT LINKS</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#C7B7A3] hover:text-white text-sm transition-colors">All Books</Link></li>
              <li><Link href="#" className="text-[#C7B7A3] hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-[#C7B7A3] hover:text-white text-sm transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div className="col-span-1 ">
            <h3 className="text-[#E8D8C4] font-semibold text-lg mb-4">OTHER LINKS</h3>
            <ul className="space-y-2">
              <li><Link href="#home" className="text-[#C7B7A3] hover:text-white text-sm transition-colors">Ministry of Education</Link></li>
              <li><Link href="#" className="text-[#C7B7A3] hover:text-white text-sm transition-colors">Linguistic Data Portal</Link></li>
              <li><Link href="#" className="text-[#C7B7A3] hover:text-white text-sm transition-colors">Central Institute of Indian Languages</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="w-full"/>
      <p className="h3 text-center text-white pt-3">©2026 <span className="font-extrabold">Central Institute of Indian Languages</span>, All Rights Reserved</p>
    </div>
  )
}

export default Footer