import React from 'react'
import { Plane, Luggage, Leaf } from 'lucide-react'

interface FlightCardProps {
  airline: string
  fromCity: string
  departTime: string
  departCode: string
  departName: string
  toCity: string
  arriveTime: string
  arriveCode: string
  arriveName: string
  duration: string
  stops: number
  stopCity?: string
  price: number
  vacantSeats: number
  co2: string
  bag: string
  imageUrl: string
}

export default function FlightCard({
  airline,
  fromCity,
  departTime,
  departCode,
  departName,
  toCity,
  arriveTime,
  arriveCode,
  arriveName,
  duration,
  stops,
  stopCity,
  price,
  vacantSeats,
  co2,
  bag,
  imageUrl,
}: FlightCardProps) {
  const stopsLabel =
    stops === 0 ? 'Non-stop' : stops === 1 ? `1 Stop${stopCity ? ` (${stopCity})` : ''}` : `${stops} Stops`

  return (
    <article className="bg-card border border-card-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Airline image */}
        <div className="relative w-full sm:w-52 h-36 sm:h-auto shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={`${airline} flight`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Airline name overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
            <span className="text-white text-xs font-semibold">{airline}</span>
          </div>
          {/* Vacant seats badge */}
          {vacantSeats <= 10 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {vacantSeats} left!
            </div>
          )}
        </div>

        {/* Flight info */}
        <div className="flex-1 p-4">
          {/* Top row: From / Route / To */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 mb-3">
            {/* From */}
            <div>
              <p className="text-xs text-secondary mb-0.5">From</p>
              <p className="font-bold text-theme text-base">{fromCity}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-foreground">{departTime}</span>
                <span className="text-xs text-secondary">PM</span>
              </div>
              <p className="text-xs text-secondary mt-0.5">Departure</p>
              <div className="flex items-center gap-1 mt-1">
                <Plane className="w-3 h-3 text-secondary" />
                <span className="text-xs text-secondary">
                  {departCode} {departName}
                </span>
              </div>
            </div>

            {/* Center: duration + stops */}
            <div className="flex flex-col items-center gap-1 pt-5 px-2">
              <p className="text-xs text-secondary whitespace-nowrap">
                Trip Duration · {duration}
              </p>
              <div className="flex items-center gap-1 w-full my-1">
                <div className="h-px flex-1 bg-border" />
                <Plane className="w-4 h-4 text-theme rotate-90" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <p
                className="text-xs font-medium"
                style={{ color: stops === 0 ? '#38a169' : '#6b7280' }}
              >
                {stopsLabel}
              </p>
            </div>

            {/* To */}
            <div className="text-right">
              <p className="text-xs text-secondary mb-0.5">To</p>
              <p className="font-bold text-theme text-base">{toCity}</p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-xl font-bold text-foreground">{arriveTime}</span>
                <span className="text-xs text-secondary">AM</span>
              </div>
              <p className="text-xs text-secondary mt-0.5">Landing</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <Plane className="w-3 h-3 text-secondary" />
                <span className="text-xs text-secondary">
                  {arriveCode} {arriveName}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-card-border my-3" />

          {/* Bottom row: price + extras + button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {/* Price */}
              <div>
                <span className="text-2xl font-bold text-theme">${price}</span>
                {vacantSeats > 0 && (
                  <span className="ml-2 text-xs text-green-600 font-medium">
                    {vacantSeats} Vacant Seats
                  </span>
                )}
              </div>

              {/* CO2 */}
              <div className="flex items-center gap-1 text-green-600">
                <Leaf className="w-3.5 h-3.5" />
                <span className="text-xs">{co2}</span>
              </div>
            </div>

            {/* Bag info */}
            <div className="flex items-center gap-1 text-secondary">
              <Luggage className="w-3.5 h-3.5" />
              <span className="text-xs">{bag}</span>
            </div>

            {/* View detail button */}
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-theme text-white text-sm font-semibold rounded-sm hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer">
              View Detail
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
