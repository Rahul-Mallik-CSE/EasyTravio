'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Building2, Plane, ArrowRight } from 'lucide-react'

const categories = [
  {
    title: 'Hotels & Stays',
    subtitle: 'Find your perfect accommodation worldwide',
    image: 'https://images.unsplash.com/photo-1584971496095-c7aa56c3519b?w=900&q=80',
    href: '/hotel/search',
    icon: Building2,
    color: 'from-theme/80 to-theme/40',
  },
  {
    title: 'Flights & Travel',
    subtitle: 'Book flights to your dream destination',
    image: 'https://images.unsplash.com/photo-1772195021919-f5c9df8d26d1?w=900&q=80',
    href: '/flight/search',
    icon: Plane,
    color: 'from-blue-600/80 to-blue-400/40',
  },
]

const ExploreSection = () => {
  const router = useRouter()

  return (
    <section className="w-full bg-background py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-primary leading-none">
            Where Do You Want To Go?
          </h2>
          <p className="text-sm md:text-base text-secondary mt-1">
            Choose your next adventure
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.title}
                onClick={() => router.push(cat.href)}
                className="group relative h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/20 to-transparent`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-md">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm md:text-base mb-4 max-w-xs">
                    {cat.subtitle}
                  </p>
                  <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Explore Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExploreSection
