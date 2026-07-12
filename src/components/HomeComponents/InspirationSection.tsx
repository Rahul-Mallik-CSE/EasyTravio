import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const InspirationSection = () => {
  return (
    <section className="relative w-full h-80 sm:h-100 md:h-128 my-2 sm:my-4 md:my-6">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        alt="Beautiful tropical beach destination"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-20 h-full flex items-center px-4 sm:px-6 md:px-8">
        <div className="w-full flex flex-col gap-14 sm:gap-18 md:gap-24">
          <div>
            <h2 className="text-white text-2xl sm:text-4xl md:text-[40px] font-extrabold leading-tight tracking-tight drop-shadow-md">
              Get Inspired For Your Next Trip
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl font-bold leading-relaxed tracking-wide drop-shadow-md">
              Read About Wonderful Adventure We Love Most
            </p>
          </div>

          <div className="max-w-60 sm:max-w-90 md:max-w-110 ml-auto">
            <h2 className="text-white text-2xl sm:text-4xl md:text-[44px] font-extrabold leading-tight tracking-tight drop-shadow-md">
              Difficult Roads Lead To Beautiful Destination .
            </h2>
            <Link
              href="/hotel"
              className="flex gap-2 justify-end items-center text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed tracking-wide drop-shadow-md hover:text-white/80 transition-colors"
            >
              Explore Hotels <IoIosArrowForward />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InspirationSection
