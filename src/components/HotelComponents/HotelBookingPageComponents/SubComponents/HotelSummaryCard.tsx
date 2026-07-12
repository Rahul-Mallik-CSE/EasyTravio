'use client'
import Image from 'next/image'
import { Building2, MapPin, Star, Users, Bed, Moon } from 'lucide-react'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'

interface HotelSummaryCardProps {
  hotel: HotelDetail
}

const BED_LABELS: Record<string, string> = {
  twoSingle: 'Two Single Beds',
  king: 'King Bed',
  babyCots: 'Baby Cots',
  double: 'Double Bed',
  single: 'Single Bed',
}

export default function HotelSummaryCard({ hotel }: HotelSummaryCardProps) {
  return (
    <div className="bg-card border border-card-border rounded-lg overflow-hidden mb-6">
      {/* Header bar */}
      <div className="bg-theme px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-semibold">
            {hotel.ratingLabel} · {hotel.starRating} Star Hotel
          </span>
        </div>
        <span className="text-white text-xs font-semibold">
          {hotel.nights} Night{hotel.nights > 1 ? 's' : ''} Stay
        </span>
      </div>

      {/* Hotel image */}
      <div className="relative w-full h-48">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="500px"
          className="object-cover"
        />
      </div>

      {/* Hotel info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-foreground text-lg">{hotel.name}</h3>
            <div className="flex items-center gap-1 text-secondary text-sm mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{hotel.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-theme/10 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-theme fill-theme" />
            <span className="font-bold text-theme text-sm">{hotel.rating}</span>
          </div>
        </div>

        <div className="border-t border-card-border pt-3 grid grid-cols-3 gap-3 text-center">
          <div className="flex flex-col items-center gap-1">
            <Users className="w-4 h-4 text-theme" />
            <span className="text-xs text-secondary">{hotel.adults} Adults, {hotel.children} Children</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-theme" />
            <span className="text-xs text-secondary">{BED_LABELS[hotel.bedType] || hotel.bedType}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Moon className="w-4 h-4 text-theme" />
            <span className="text-xs text-secondary">{hotel.nights} Nights</span>
          </div>
        </div>

        <div className="border-t border-card-border pt-3">
          <p className="text-sm text-secondary">
            <span className="font-semibold text-foreground">Room Type:</span> {hotel.roomType}
          </p>
          <p className="text-sm text-secondary mt-1">
            <span className="font-semibold text-foreground">Theme:</span> {hotel.theme}
          </p>
        </div>
      </div>
    </div>
  )
}
