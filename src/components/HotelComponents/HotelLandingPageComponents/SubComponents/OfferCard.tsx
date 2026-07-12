import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { OfferItem } from '@/types/HotelLandingPageTypes'

interface OfferCardProps {
  offer: OfferItem
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div
      className={`relative w-full h-50 sm:h-55 md:h-69.5 overflow-hidden aspect-4/3 group cursor-pointer ${offer.spanClassName}`}
    >
      <Image
        src={offer.image}
        alt={offer.label}
        height={400}
        width={400}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute bottom-4 left-4">
        <Button
          className="bg-theme hover:bg-theme/80 text-white 
                     text-sm md:text-base font-medium px-4 py-2 
                     rounded-md flex items-center gap-2 shadow-md"
        >
          {offer.label}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default OfferCard
