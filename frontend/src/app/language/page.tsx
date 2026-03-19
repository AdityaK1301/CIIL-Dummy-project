import React from 'react'
import { Search, User } from 'lucide-react'
import { FocusCards  } from '@/components/ui/focus-cards';

function page() {
    const language = [
    {
      title: "Hindi",
      src: "https://i.pinimg.com/736x/82/75/4d/82754d7e58db7ebbad533ac6351b7400.jpg",
    },
    {
      title: "Bengali",
      src: "https://i.pinimg.com/1200x/be/9b/b9/be9bb98f436cb69a17d10c082558d785.jpg",
    },
    {
      title: "Tamil",
      src: "https://i.pinimg.com/1200x/6c/f7/3c/6cf73cd2176806ed582e91c93bbb92ee.jpg",
    },
    {
      title: "Telugu",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kxKWoEIshnbh3dZoUuOBe3XGKLEoKYgwLA&s",
    },
    {
      title: "Malayalam",
      src: "https://i.pinimg.com/1200x/3f/88/bb/3f88bb1068d4a6eea648a1ea6baf95bc.jpg",
    },
    {
      title: "Urdu",
      src: "https://i.pinimg.com/736x/65/5a/7e/655a7ec57e3f919622ac44d46c15bfec.jpg",
    },
    {
      title: "Assamese",
      src: "https://images.indianexpress.com/2024/10/assamese.jpg?resize=600,338",
    },
    {
      title: "Gujarati",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiJh-ZWMK1nETIEiIuz7M5xyBBqegwnYR-Q&s",
    },
  ];
  return (
    <div className='bg-[#f9eedb] w-full py-7 px-8'>
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between max-w-7xl mx-auto">   
            <h2 className='text-[#6D2932] md:text-4xl text-xl font-extrabold'>Pick Books by Language</h2>
            <div className='flex'>
                <Search className='h-11 w-9 pr-1 rounded-'/>
                <input type="text"
                placeholder='Search your language...' 
                className='min-w-[50px] p-2 border-2 border-[#6D2932] rounded '/>
            </div>
        </div>
        <FocusCards cards={language} />
    </div>
  )
}

export default page