'use client'
import { HoverEffect } from "../ui/card-hover-effect";
import { CircleArrowRight } from "lucide-react";

export function Section3() {
  return (
    <section id="booksbyLanguage" className="w-full py-10 bg-white px-4 sm:px-6 lg:px-8">
      <div  className="md:mx-15 mx-12">
        <hr className="py-4 border-[#561C24]"/>
          <h2 className="text-5xl
            w-fit
            bg-clip-text
            text-transparent
            py-8 px-2
            bg-gradient-to-br
            from-[#341418]
            to-[#873741]
            font-extrabold">
            
            Books By Language</h2>
        <HoverEffect items={languages} />
      </div>
    </section>
  );
}

export const languages = [
  {
    title: "English",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg",
    link: "",
  },
  {
    title: "Hindi",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
  {
    title: "Sanskrit",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
  {
    title: "Tamil",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
  {
    title: "Telugu",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
  {
    title: "Gujarati",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
  {
    title: "Malayalam",
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
  {
    title: <CircleArrowRight className="w-10 h-10 text-white" />,
    image: "https://i.pinimg.com/736x/9e/17/58/9e175870df16e1a54f3259f4b7354bba.jpg", // Add an image URL
    link: "",
  },
];