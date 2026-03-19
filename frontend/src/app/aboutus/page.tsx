'use client'
import { useState } from "react";
import Image from 'next/image'
import { Lens } from "@/components/ui/lens";

function page() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="w-full min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="order-2 px-12 lg:order-1">
            <div className="relative w-full max-w-2xl mx-auto">
              <Lens hovering={hovering} setHovering={setHovering}>
            <img
              src="/building.gif"
              alt="image"
              width={500}
              height={500}
              className="rounded-2xl"
            />
          </Lens>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6 flex flex-col items-center lg:items-start">
            <img
              src="https://login.ciil.org/public/images/goi.png"
              alt=""
              className="lg:ps-40 lg:h-55 lg:w-100 w-40 h-40"
            />

            <ul className="space-y-4">
              <li className="flex gap-3 text-sm sm:text-base text-[#561C24]">
                <span className="text-[#6D2932] font-bold text-lg">•</span>
                <span>
                  Advices and Assists Central as well as State Governments in
                  the matters of language.
                </span>
              </li>
              <li className="flex gap-3 text-sm sm:text-base text-[#561C24]">
                <span className="text-[#6D2932] font-bold text-lg">•</span>
                <span>
                  Contributes to the development of all Indian Languages by
                  creating content and corpus.
                </span>
              </li>
              <li className="flex gap-3 text-sm sm:text-base text-[#561C24]">
                <span className="text-[#6D2932] font-bold text-lg">•</span>
                <span>
                  Protects and Documents Minor, Minority and Tribal Languages.
                </span>
              </li>
              <li className="flex gap-3 text-sm sm:text-base text-[#561C24]">
                <span className="text-[#6D2932] font-bold text-lg">•</span>
                <span>
                  Promotes Linguistic harmony by teaching 20 Indian languages to
                  non-native learners.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-15 mx-10 font-extrabold ">
        <h1
          className="
            text-5xl
            w-fit
            bg-clip-text
            text-transparent
            py-8 px-2
            bg-gradient-to-r
            from-[#341418]
            to-[#873741]
            font-extrabold">
          A Legend
        </h1>
        <p className="text-[#6D2932] text-justify font-light text-xl">
          All through the last 54 years in existence, this Institute has worked
          in a number of diverse disciplines. For these disciplines that are
          traditionally known to be often hostile to one another. CIIL has acted
          as a catalytic force responsible for convergence of different ideas.
          Such confluences are more evident at the present moment. In fact, on
          the borderlines of such largely overlapping fields lie those numerous
          workers who give birth to new approaches to the study of man and
          nature. As students standing at crossroads, we soon realize that
          events would lead us in unearthing the secrets of the mutually
          engaging forces of language, society and culture.
        </p>
      </div>
    </div>
  );
}

export default page