import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import type { HotelDestinationCardData } from '@/types/HotelLandingPageTypes'

interface HotelDestinationCardProps {
  card: HotelDestinationCardData
  mobile?: boolean
}

const HotelDestinationCard = ({ card, mobile = false }: HotelDestinationCardProps) => {
  const router = useRouter()

  return (
    <article
      onClick={() => router.push(`/hotel/search?destination=${encodeURIComponent(card.title)}`)}
      className={`relative overflow-visible rounded-sm border border-white/70 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:shadow-lg transition-shadow ${
        mobile ? 'w-full' : 'max-w-[320px] sm:max-w-85'
      }`}
    >
      <div className="absolute -top-3 -left-3.5  z-10">
        <Image
          src="/images/Tag.png"
          alt="Featured"
          width={100}
          height={50}
        />
      </div>

      <div className={`flex ${mobile ? 'gap-3 p-1' : 'gap-2 p-2 pr-4'}`}>
        <div className={`relative shrink-0 overflow-hidden rounded-[10px] ${mobile ? 'h-20 w-20' : 'h-18 w-18 sm:h-24 sm:w-31'}`}>
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
