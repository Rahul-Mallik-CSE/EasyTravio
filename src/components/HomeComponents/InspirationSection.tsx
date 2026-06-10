import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const InspirationSection = () => {
  return (
    <section className="relative w-full h-80 sm:h-100 md:h-128 my-1 md:my-4">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
          style={{ backgroundImage: "url('/HomePageImages/Inspiration-banner.png')" }}
        />

        
        {/* Headline */}
        <div className="max-w-7xl mx-auto relative z-20 h-full flex items-center px-4 sm:px-6 md:px-8">
          <div className="w-full flex flex-col gap-14 sm:gap-18 md:gap-24">
            <div>
              <h2 className="text-white text-2xl sm:text-4xl md:text-[40px] font-extrabold leading-tight tracking-tight drop-shadow-md">
                Get Inspired For Your Next Trip
              </h2>
              <p className="text-white text-base sm:text-lg md:text-xl font-bold leading-relaxed tracking-wide drop-shadow-md">
                Read About Wonderful Adventure We Love Most
              </p>
            </div>

            <div className="max-w-60 sm:max-w-90 md:max-w-110 ml-auto ">
              <h2 className="text-white  text-2xl sm:text-4xl md:text-[44px] font-extrabold leading-tight tracking-tight drop-shadow-md">
                Difficult Roads Lead To Beautiful Destination .
              </h2>
              <Link href="/#" className="flex gap-2 justify-end items-center text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed tracking-wide drop-shadow-md">
                Read More  <IoIosArrowForward />
              </Link>
            </div>
          </div>
        </div>
      
    </section>
  )
}

export default InspirationSection
