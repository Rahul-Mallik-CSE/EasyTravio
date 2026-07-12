'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { specialOffers } from '@/data/HomePageData'

const filterTabs = ['All', 'Hotels', 'Flights', 'Multi'] as const

const SpecialOfferSection = () => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const getFilteredOffers = () => {
    if (activeFilter === 'All') return specialOffers
    if (activeFilter === 'Hotels') return specialOffers.filter((o) => o.href.includes('hotel'))
    if (activeFilter === 'Flights') return specialOffers.filter((o) => o.href.includes('flight'))
    return specialOffers
  }

  return (
    <section className="w-full bg-background py-6 sm:py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-primary leading-none">
            Special Offers
          </h2>

          {/* Filter Tabs */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-theme text-white shadow-md shadow-theme/20'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 gap-1 rounded-sm overflow-hidden md:grid-cols-12">
          {getFilteredOffers().map((offer) => (
            <article
              key={offer.title}
              className={`group relative h-50 sm:h-55 md:h-69.5 overflow-hidden cursor-pointer ${offer.spanClassName}`}
              onClick={() => router.push(offer.href)}
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

              <div className="absolute inset-x-0 bottom-0 flex items-end p-4 md:p-5">
                <button
                  type="button"
                  className="inline-flex items-center cursor-pointer gap-2 rounded-sm bg-black/75 px-4 py-2 text-sm font-medium text-white backdrop-blur-[2px] transition-colors hover:bg-black/85"
                >
                  <span>{offer.title}</span>
                  <IoArrowForward className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialOfferSection
