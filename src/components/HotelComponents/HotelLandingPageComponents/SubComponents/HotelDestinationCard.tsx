import Image from 'next/image'
import React from 'react'
import type { HotelDestinationCardData } from '@/types/HotelLandingPageTypes'

interface HotelDestinationCardProps {
  card: HotelDestinationCardData
  mobile?: boolean
}

const HotelDestinationCard = ({ card, mobile = false }: HotelDestinationCardProps) => {
  return (
    <article
      className={`relative overflow-hidden rounded-[14px] border border-white/70 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${
        mobile ? 'w-full' : 'w-[320px] sm:w-[340px]'
      }`}
    >
      {card.featuredLabel && (
        <div className="absolute left-[-34px] top-5 z-10 -rotate-45 bg-[#2a7ca6] px-10 py-1.5 text-[0.8rem] font-medium tracking-wide text-white shadow-md">
          {card.featuredLabel}
        </div>
      )}

      <div className={`flex ${mobile ? 'gap-3 p-3' : 'gap-4 p-4'}`}>
        <div className={`relative shrink-0 overflow-hidden rounded-[10px] ${mobile ? 'h-20 w-20' : 'h-24 w-24 sm:h-28 sm:w-28'}`}>
          <Image src={card.image} alt={card.title} fill sizes="112px" className="object-cover object-center" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className={`truncate font-extrabold text-primary ${mobile ? 'text-[1.02rem]' : 'text-[1.2rem] sm:text-[1.35rem]'}`}>
            {card.title}
          </h3>
          <p className={`mt-1 text-tertiary ${mobile ? 'text-[0.78rem]' : 'text-[0.85rem] sm:text-[0.9rem]'}`}>
            {card.subtitle}
          </p>
        </div>
      </div>
    </article>
  )
}

export default HotelDestinationCard