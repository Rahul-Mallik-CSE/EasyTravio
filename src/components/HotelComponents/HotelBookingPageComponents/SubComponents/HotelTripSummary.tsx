'use client'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'

interface HotelTripSummaryProps {
  hotel: HotelDetail
}

export default function HotelTripSummary({ hotel }: HotelTripSummaryProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-foreground mb-2">Your Trip Summary</h2>
      <p className="text-sm text-secondary leading-relaxed">
        Your stay at <span className="font-semibold text-foreground">{hotel.name}</span> is located in{' '}
        <span className="font-semibold text-foreground">{hotel.location}, {hotel.city}</span>.
        The hotel is {hotel.distanceToShore.toLowerCase()}.
        {hotel.breakfastIncluded && ' Breakfast is included with your stay.'}
        {' '}Check-in is from <span className="font-semibold text-foreground">{hotel.checkInTime}</span> and
        check-out is until <span className="font-semibold text-foreground">{hotel.checkOutTime}</span>.
        You will be staying for <span className="font-semibold text-foreground">{hotel.nights} night{hotel.nights > 1 ? 's' : ''}</span>.
      </p>
    </div>
  )
}
