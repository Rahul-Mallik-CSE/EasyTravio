'use client'
import { Star, ChevronDown, Leaf } from 'lucide-react'

export default function FlightReviews() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <button className="flex items-center gap-1.5 text-secondary hover:text-foreground transition-colors cursor-pointer">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="font-semibold text-foreground">Very Good</span>
        <span className="text-secondary">, 2,450 Reviews</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <button className="flex items-center gap-1.5 text-secondary hover:text-theme transition-colors cursor-pointer">
        <Leaf className="w-4 h-4 text-green-500" />
        <span>Sustainability Level</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
