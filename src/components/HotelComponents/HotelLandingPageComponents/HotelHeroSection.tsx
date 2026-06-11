"use client"

import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import HotelHeroTabs from './SubComponents/HotelHeroTabs'
import HotelDestinationCard from './SubComponents/HotelDestinationCard'
import type { HotelDestinationCardData, HotelHeroTab, HotelHeroTabKey } from '@/types/HotelLandingPageTypes'

const tabs: HotelHeroTab[] = [
  { key: 'special-offers', label: 'Special Offers' },
  { key: 'last-search', label: 'Last Search' },
  { key: 'trending-destinations', label: 'Trending Destinations' },
  { key: 'highest-reviewed', label: 'Highest Reviewed' },
  { key: 'top-rated', label: 'Top Rated' },
]

const cards: HotelDestinationCardData[] = [
  {
    id: 1,
    title: 'Belgium',
    subtitle: 'Bruxelles Gare Du Midi',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Belgium.png',
    featuredLabel: 'Best Deals',
    categoryKeys: ['special-offers', 'highest-reviewed', 'top-rated'],
    desktopClassName: 'left-6 top-8 md:left-10 md:top-8',
  },
  {
    id: 2,
    title: 'Amsterdam',
    subtitle: 'Bunk',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Amsterdam.png',
    categoryKeys: ['special-offers', 'last-search', 'trending-destinations'],
    desktopClassName: 'right-6 top-16 md:right-10 md:top-16',
  },
  {
    id: 3,
    title: 'New Jersey',
    subtitle: 'Windsor',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/NewJersey.png',
    categoryKeys: ['special-offers', 'last-search', 'top-rated'],
    desktopClassName: 'left-6 bottom-8 md:left-8 md:bottom-10',
  },
  {
    id: 4,
    title: 'Nepal',
    subtitle: 'Hyatt Regency K',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Nepal.png',
    categoryKeys: ['special-offers', 'last-search', 'highest-reviewed'],
    desktopClassName: 'left-1/2 top-1/2 md:left-1/2 md:top-[48%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    id: 5,
    title: 'Gothenburg',
    subtitle: 'First Hotel G',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Gothenburg.png',
    categoryKeys: ['special-offers', 'trending-destinations', 'highest-reviewed'],
    desktopClassName: 'right-8 bottom-8 md:right-14 md:bottom-10',
  },
]

const mapByTab: Record<HotelHeroTabKey, number[]> = {
  'special-offers': [1, 2, 3, 4, 5],
  'last-search': [2, 3, 4],
  'trending-destinations': [1, 2, 5],
  'highest-reviewed': [1, 4, 5],
  'top-rated': [1, 3, 2],
}

const HotelHeroSection = () => {
  const [activeTab, setActiveTab] = useState<HotelHeroTabKey>('special-offers')

  const visibleCards = useMemo(
    () => cards.filter((card) => card.categoryKeys.includes(activeTab) && mapByTab[activeTab].includes(card.id)),
    [activeTab],
  )

  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-8">
      <div className="mx-auto w-full ">
        <div className="relative overflow-hidden h-100 sm:h-120 md:h-166 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <Image
            src="/HotelImages/LandingPageImages/HotelHeroImages/HotelHeroBanner.png"
            alt="Hotel hero banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/70" />

          <div className="absolute inset-x-0 top-0 flex justify-center px-4 pt-22 sm:pt-28 md:pt-36">
            <div className="text-center text-primary">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold tracking-tight drop-shadow-md">
                Why Choose Us?
              </h2>
              <button
                type="button"
                className="mt-3 cursor-pointer inline-flex items-center gap-3 rounded-sm bg-theme px-6 py-0.5 text-sm md:text-base  text-white shadow-lg transition-colors hover:bg-theme/90"
              >
                <span>Explore More</span>
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-4 pb-12 sm:px-6  md:px-10 ">
            <h1 className="text-center text-4xl sm:text-5xl md:text-[60px] font-light tracking-tight text-white drop-shadow-[0_6px_22px_rgba(0,0,0,0.45)]">
              Exclusive Hotel Search!
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-8 relative z-10 -mt-4 sm:-mt-6 md:-mt-8">
          <HotelHeroTabs tabs={tabs} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as HotelHeroTabKey)} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative overflow-hidden rounded-b-[20px] md:rounded-b-[28px] bg-[#004d5d] shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
          <div className=" relative min-h-[540px] px-4 py-4 sm:px-6 sm:py-6 md:min-h-[640px] md:px-8 md:py-8">
            <div className="absolute inset-0 hidden md:block">
              <Image
                src="/HotelImages/LandingPageImages/HotelHeroImages/HotelHeroGlobal.png"
                alt="Global view background"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#004d5d]/20" />
            </div>

            <div className="relative z-10 md:hidden">
              <div className="relative mb-4 h-44 overflow-hidden rounded-[18px] bg-[#004d5d] sm:h-52">
                <Image
                  src="/HotelImages/LandingPageImages/HotelHeroImages/HotelHeroGlobal.png"
                  alt="Global view background"
                  fill
                  sizes="100vw"
                  className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-[#004d5d]/55" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div>
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-white/80">Global view</p>
                    <h2 className="mt-1 text-[1.3rem] font-extrabold text-white">Discover top hotel destinations</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {visibleCards.map((card) => (
                  <HotelDestinationCard key={card.id} card={card} mobile />
                ))}
              </div>
            </div>

            <div className="relative z-10 hidden md:block min-h-[560px]">
              {visibleCards.map((card) => (
                <div key={card.id} className={`absolute ${card.desktopClassName}`}>
                  <HotelDestinationCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HotelHeroSection
