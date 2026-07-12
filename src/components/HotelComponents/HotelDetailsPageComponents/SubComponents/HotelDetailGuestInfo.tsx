'use client'
import React from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'

interface HotelDetailGuestInfoProps {
  hotel: HotelDetail
}

const AMENITY_ICONS: Record<string, string> = {
  'Free Wifi': '📶',
  'Parking Available': '🅿️',
  'Restaurant': '🍽️',
  'Fitness Center': '💪',
  'Bathroom': '🚿',
  'Room Service': '🛎️',
  'Air Conditioning': '❄️',
  'Tea/Coffee Machine': '☕',
  'Swimming Pool': '🏊',
  'Spa & Wellness': '🧖',
  'Bar & Lounge': '🍸',
  'Conference Room': '📊',
  'Laundry Service': '👔',
  'Airport Shuttle': '🚌',
  'Concierge': '💁',
  'Night Club': '🎵',
}

const HotelDetailGuestInfo: React.FC<HotelDetailGuestInfoProps> = ({ hotel }) => {
  const bedTypeLabel: Record<string, string> = {
    twoSingle: 'Two Single Beds',
    king: 'King Bed',
    babyCots: 'Baby Cots',
    double: 'Double Bed',
    single: 'Single Bed',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Amenities */}
      <div>
        <h3 className="text-lg font-extrabold text-primary mb-4">Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {hotel.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2 text-sm text-secondary">
              <span>{AMENITY_ICONS[amenity] || '✓'}</span>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Info */}
      <div>
        <div className="mb-4">
          <p className="text-sm text-primary font-semibold">
            {hotel.adults} Adults, {hotel.children} Children, {hotel.nights} Nights | {hotel.rooms || 2} Rooms, {bedTypeLabel[hotel.bedType] || hotel.bedType}
          </p>
        </div>

        <div className="flex items-center gap-1 text-secondary text-sm mb-4">
          <IoLocationOutline className="w-4 h-4 shrink-0" />
          <span>{hotel.address}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 hover:border-red-400 hover:text-red-500"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-2">
              {hotel.discountPercent > 0 && (
                <span className="text-red-500 text-sm font-semibold">{hotel.discountPercent}% Off</span>
              )}
              <span className="text-green-600 font-extrabold text-2xl md:text-3xl">${hotel.pricePerNight}</span>
              <span className="text-secondary text-sm">Per night</span>
            </div>
          </div>

          
        </div>

        <div className="w-full flex items-center justify-center mt-6">
          <Button className="w-74 h-9 md:h-11 bg-theme hover:bg-theme/90 text-white font-bold px-8 py-2.5 rounded-md">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HotelDetailGuestInfo
