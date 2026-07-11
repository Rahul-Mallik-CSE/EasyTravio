'use client'
import Image from 'next/image'
import { Plane } from 'lucide-react'
import type { Flight } from '@/types/FlightAllTypes'
import { formatDuration, formatTime, formatDate, getStopsLabel } from '@/lib/utils/flightHelpers'
import { AIRLINE_IMAGES, DEFAULT_IMAGE } from '@/data/FlightLandingPageData'


interface FlightSummaryCardProps {
  flight: Flight
}

export default function FlightSummaryCard({ flight }: FlightSummaryCardProps) {
  const imageUrl = AIRLINE_IMAGES[flight.airline] || DEFAULT_IMAGE
  const stopsLabel = getStopsLabel(flight.stops)

  return (
    <div className="bg-card border border-card-border rounded-lg overflow-hidden mb-6">
      {/* Header bar */}
      <div className="bg-theme px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-semibold">
            {stopsLabel}{flight.stops > 0 ? ', Connecting Flight' : ''}
          </span>
        </div>
        <span className="text-white text-xs font-semibold">
          Flight Duration · {formatDuration(flight.duration)}
        </span>
      </div>

      {/* Airline image */}
      <div className="relative w-full h-40">
        <Image
          src={imageUrl}
          alt={`${flight.airline} flight`}
          fill
          sizes="500px"
          className="object-cover"
        />
      </div>

      {/* Flight numbers */}
      <div className="border-t border-card-border">
        <div className="flex items-center justify-between px-4 py-2 border-b border-card-border/50">
          <span className="text-xs text-secondary">
            Flight From {flight.originCity}{' '}
            <span className="font-bold text-foreground">{flight.flightNumber}</span>
          </span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-theme flex items-center justify-center">
              <Plane className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-xs font-semibold">{flight.airline}</span>
          </div>
        </div>
        {flight.stopCities.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-xs text-secondary">
              Connecting Via{' '}
              <span className="font-bold text-foreground">{flight.stopCities.join(', ')}</span>
            </span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                <Plane className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-xs font-semibold">{flight.airline}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
