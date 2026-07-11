import { Star } from 'lucide-react'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailRatingProps {
  flight: FlightDetail
}

export default function FlightDetailRating({ flight }: FlightDetailRatingProps) {
  return (
    <div className="px-5 pb-0">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-semibold text-foreground">{flight.rating}</span>
        <span className="text-xs text-secondary">({flight.reviewCount.toLocaleString()} reviews)</span>
      </div>
    </div>
  )
}
