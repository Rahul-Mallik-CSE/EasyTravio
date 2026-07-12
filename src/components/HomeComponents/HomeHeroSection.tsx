'use client'

import Image from 'next/image'


const HomeHeroSection = () => {

  return (
    <section className="relative w-full h-105 sm:h-115 md:h-125">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1920&q=80"
        alt="Luxury hotel resort with pool"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Headline */}
        <div className="pt-20 sm:pt-24 md:pt-32 text-center">
          <p className="text-white/80 text-sm md:text-base font-semibold uppercase tracking-[0.25em] mb-3">
            Explore the World
          </p>
          <h1 className="text-white text-3xl sm:text-5xl md:text-[56px] font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Find Your Perfect<br />
            <span className="text-theme">Dream Destination</span>
          </h1>
          <p className="text-white/80 text-sm md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Discover exclusive deals on hotels and flights worldwide. Your next adventure starts here.
          </p>
        </div>

       
      </div>
    </section>
  )
}

export default HomeHeroSection
