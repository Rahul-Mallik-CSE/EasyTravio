'use client'
import Link from 'next/link'
import { Plane, Luggage, Leaf } from 'lucide-react'
import type { Flight } from '@/types/FlightAllTypes'
import { formatDuration, formatTime, formatDate, getStopsLabel } from '@/lib/utils/flightHelpers'

const AIRLINE_IMAGES: Record<string, string> = {
  'Biman Bangladesh': 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400&h=300&fit=crop',
  'Emirates': 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400&h=300&fit=crop',
  'Qatar Airways': 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=300&fit=crop',
  'Singapore Airlines': 'https://images.unsplash.com/photo-1753621343732-aee881910914?w=400&h=300&fit=crop',
  'AirAsia': 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&h=300&fit=crop',
  'Turkish Airlines': 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400&h=300&fit=crop',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1628964178609-aec11c666040?w=400&h=300&fit=crop'

const BAGGAGE_OPTIONS = ['20kg Checked', '23kg Checked', '25kg Checked', '30kg Checked', 'Cabin Only']

interface FlightCardProps {
  flight: Flight
}

export default function FlightCard({ flight }: FlightCardProps) {
  const stopsLabel = getStopsLabel(flight.stops)
  const stopsColor = flight.stops === 0 ? '#38a169' : '#6b7280'
  const imageUrl = AIRLINE_IMAGES[flight.airline] || DEFAULT_IMAGE
  const baggage = BAGGAGE_OPTIONS[Math.floor(flight.price % BAGGAGE_OPTIONS.length)]
  const co2 = `${Math.round(flight.duration * 0.25)} kg CO₂`

  return (
    <article className="bg-card border border-card-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Airline image */}
        <div className="relative w-full sm:w-52 h-36 sm:h-auto shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={`${flight.airline} flight`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
            <span className="text-white text-xs font-semibold">{flight.airline}</span>
          </div>
          {flight.availableSeats <= 10 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {flight.availableSeats} left!
            </div>
          )}
        </div>

        {/* Flight info */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 mb-3">
            {/* From */}
            <div>
              <p className="text-xs text-secondary mb-0.5">From</p>
              <p className="font-bold text-theme text-base">{flight.originCity}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-foreground">{formatTime(flight.departureTime)}</span>
              </div>
              <p className="text-[11px] text-secondary mt-0.5">{formatDate(flight.departureTime)}</p>
              <div className="flex items-center gap-1 mt-1">
                <Plane className="w-3 h-3 text-secondary" />
                <span className="text-xs text-secondary">{flight.origin}</span>
              </div>
            </div>

            {/* Center: duration + stops */}
            <div className="flex flex-col items-center gap-1 pt-5 px-2">
              <p className="text-xs text-secondary whitespace-nowrap">
                Trip Duration · {formatDuration(flight.duration)}
              </p>
              <div className="flex items-center gap-1 w-full my-1">
                <div className="h-px flex-1 bg-border" />
                <Plane className="w-4 h-4 text-theme rotate-90" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="text-xs font-medium" style={{ color: stopsColor }}>
                {stopsLabel}
              </p>
              {flight.stopCities.length > 0 && (
                <p className="text-[10px] text-secondary">via {flight.stopCities.join(', ')}</p>
              )}
            </div>

            {/* To */}
            <div className="text-right">
              <p className="text-xs text-secondary mb-0.5">To</p>
              <p className="font-bold text-theme text-base">{flight.destinationCity}</p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-xl font-bold text-foreground">{formatTime(flight.arrivalTime)}</span>
              </div>
              <p className="text-[11px] text-secondary mt-0.5">{formatDate(flight.arrivalTime)}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <Plane className="w-3 h-3 text-secondary" />
                <span className="text-xs text-secondary">{flight.destination}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-card-border my-3" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-2xl font-bold text-theme">${flight.price}</span>
                {flight.availableSeats > 0 && (
                  <span className="ml-2 text-xs text-green-600 font-medium">
                    {flight.availableSeats} Vacant Seats
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Leaf className="w-3.5 h-3.5" />
                <span className="text-xs">{co2}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-secondary">
              <Luggage className="w-3.5 h-3.5" />
              <span className="text-xs">{baggage}</span>
            </div>

            <Link
              href={`/flight/${flight.id}`}
              className="inline-flex items-center gap-2 px-5 py-2 bg-theme text-white text-sm font-semibold rounded-sm hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
