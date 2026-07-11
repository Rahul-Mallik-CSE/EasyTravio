'use client'
import type { Flight } from '@/types/FlightAllTypes'

interface PriceDetailsProps {
  flight: Flight
  adults?: number
  children?: number
  infants?: number
}

export default function PriceDetails({ flight, adults = 1, children: childCount = 0, infants = 0 }: PriceDetailsProps) {
  const adultPrice = flight.price * adults
  const childPrice = Math.round(flight.price * 0.75) * childCount
  const infantPrice = Math.round(flight.price * 0.1) * infants
  const total = adultPrice + childPrice + infantPrice

  return (
    <div className="bg-card border border-card-border rounded-lg p-4 mb-6">
      <p className="font-bold text-foreground mb-3">Price Details</p>
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <span className="text-theme font-bold">${adultPrice}</span>
        <span className="text-secondary">{adults} Adult{adults !== 1 ? 's' : ''}</span>
        {childCount > 0 && (
          <>
            <span className="text-theme font-bold">${childPrice}</span>
            <span className="text-secondary">{childCount} Child{childCount !== 1 ? 'ren' : ''}</span>
          </>
        )}
        {infants > 0 && (
          <>
            <span className="text-theme font-bold">${infantPrice}</span>
            <span className="text-secondary">{infants} Infant{infants !== 1 ? 's' : ''}</span>
          </>
        )}
      </div>
      <div className="border-t border-card-border mt-3 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Total (USD)</span>
        <span className="text-xl font-bold text-theme">${total}</span>
      </div>
    </div>
  )
}
