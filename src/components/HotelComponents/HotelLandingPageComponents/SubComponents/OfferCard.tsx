'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { OfferItem } from '@/types/HotelLandingPageTypes'

interface OfferCardProps {
  offer: OfferItem
}

const OFFERqueryParams: Record<string, Record<string, string>> = {
  'Loyalty Discounts': { sortBy: 'price-asc' },
  'Early Booking Discounts': { checkIn: '2026-08-01' },
  'Last-Minute Deals': { sortBy: 'price-asc' },
  'Family Packages': { adults: '2', children: '2' },
  'Birthday Or Anniversary Specials': { sortBy: 'rating-desc' },
  'Referral Programs': {},
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const router = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams()
    const extra = OFFERqueryParams[offer.label] ?? {}
    for (const [key, value] of Object.entries(extra)) {
      params.set(key, value)
    }
    const qs = params.toString()
    router.push(`/hotel/search${qs ? `?${qs}` : ''}`)
  }

  return (
    <div
      className={`relative w-full h-50 sm:h-55 md:h-69.5 overflow-hidden aspect-4/3 group cursor-pointer ${offer.spanClassName}`}
      onClick={handleClick}
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
                     rounded-md flex items-center gap-2 shadow-md pointer-events-none"
        >
          {offer.label}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default OfferCard
