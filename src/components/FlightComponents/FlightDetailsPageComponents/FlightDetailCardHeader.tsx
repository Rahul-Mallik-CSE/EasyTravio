'use client'
import { useRouter } from 'next/navigation'
import { Plane, X } from 'lucide-react'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailCardHeaderProps {
  flight: FlightDetail
}

export default function FlightDetailCardHeader({ flight }: FlightDetailCardHeaderProps) {
  const router = useRouter()
  const stopBetweenText = flight.stops > 0
    ? `${flight.stops} Stop, ${flight.stopCity || '3h Between'}`
    : 'Non-stop'

  return (
    <div className="bg-theme px-5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Plane className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-semibold">{stopBetweenText}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white text-sm font-semibold">
          Flight Duration · {flight.duration}
        </span>
        <button
          onClick={() => router.back()}
          className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white cursor-pointer transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
