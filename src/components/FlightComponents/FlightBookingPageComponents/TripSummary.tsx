'use client'
import type { Flight } from '@/types/FlightAllTypes'

interface TripSummaryProps {
  flight: Flight
}

export default function TripSummary({ flight }: TripSummaryProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-foreground mb-2">Your Trip Summary</h2>
      <p className="text-sm text-secondary leading-relaxed">
        Your flight takes off from <span className="font-semibold text-foreground">{flight.origin}</span> ({flight.originCity}).
        {flight.stops > 0 && flight.stopCities.length > 0 && (
          <>
            {' '}You will have a stop at{' '}
            <span className="font-semibold text-foreground">{flight.stopCities.join(', ')}</span>.
          </>
        )}{' '}
        Final destination is{' '}
        <span className="font-semibold text-foreground">{flight.destination}</span> ({flight.destinationCity}).
        Total travel time is{' '}
        <span className="font-semibold text-foreground">{Math.floor(flight.duration / 60)}h {flight.duration % 60}m</span>.
      </p>
    </div>
  )
}
