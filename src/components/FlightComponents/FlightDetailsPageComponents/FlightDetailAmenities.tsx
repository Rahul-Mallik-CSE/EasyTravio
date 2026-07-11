import { Snowflake, Luggage, PawPrint } from 'lucide-react'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailAmenitiesProps {
  flight: FlightDetail
}

export default function FlightDetailAmenities({ flight }: FlightDetailAmenitiesProps) {
  return (
    <div className="px-5 py-0">
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-secondary">
        {/* City stops */}
        <div className="flex items-center gap-1">
          <Snowflake className="w-3.5 h-3.5 text-theme" />
          <span>{flight.stops > 0 ? `-${flight.stops} · ${flight.stopCity || 'Stop'}` : `· ${flight.departureAirport.city}`}</span>
        </div>
        <div className="flex items-center gap-1">
          <Snowflake className="w-3.5 h-3.5 text-blue-400" />
          <span>{flight.stops > 0 ? `2 · ${flight.stopCity}` : '· Direct'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Snowflake className="w-3.5 h-3.5 text-green-400" />
          <span>· {flight.arrivalAirport.city}</span>
        </div>

        {/* Baggage */}
        <div className="flex items-center gap-1">
          <Luggage className="w-3.5 h-3.5" />
          <span>{flight.baggageWeight}</span>
        </div>
        <div className="flex items-center gap-1">
          <Luggage className="w-3.5 h-3.5" />
          <span>{flight.baggageWeight}</span>
        </div>
        <div />

        {/* Pet allowed */}
        <div className="flex items-center gap-1">
          <PawPrint className="w-3.5 h-3.5" />
          <span>{flight.petAllowed ? 'Pet Allowed' : 'No Pets'}</span>
        </div>
        <div className="flex items-center gap-1">
          <PawPrint className="w-3.5 h-3.5" />
          <span>{flight.petAllowed ? 'Pet Allowed' : 'No Pets'}</span>
        </div>
      </div>
    </div>
  )
}
