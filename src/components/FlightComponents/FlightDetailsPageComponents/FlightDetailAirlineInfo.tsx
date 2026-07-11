import { Plane } from 'lucide-react'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailAirlineInfoProps {
  flight: FlightDetail
}

export default function FlightDetailAirlineInfo({ flight }: FlightDetailAirlineInfoProps) {
  return (
    <div className="border-b border-card-border">
      <div className="flex items-center justify-between px-5 py-2 border-b border-card-border/50">
        <span className="text-xs text-secondary">
          First Flight No From {flight.departureAirport.city}{' '}
          <span className="font-bold text-foreground">{flight.flightNumber}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <Plane className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-foreground">{flight.airline}</span>
        </div>
      </div>
      {flight.secondFlightNumber && (
        <div className="flex items-center justify-between px-5 py-2">
          <span className="text-xs text-secondary">
            Second Flight No From {flight.stopCity || 'Rome'}{' '}
            <span className="font-bold text-foreground">{flight.secondFlightNumber}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
              <Plane className="w-3 h-3 text-white rotate-45" />
            </div>
            <span className="text-xs font-semibold text-foreground">{flight.secondAirline || flight.airline}</span>
          </div>
        </div>
      )}
    </div>
  )
}
