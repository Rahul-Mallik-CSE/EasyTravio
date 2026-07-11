import React from 'react'
import { Plane, SearchX, WifiOff } from 'lucide-react'

export default function FlightEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <SearchX className="w-8 h-8 text-secondary" />
      </div>
      <p className="text-base font-semibold text-foreground">No flights match your filters</p>
      <p className="text-sm text-secondary text-center max-w-xs">
        Try adjusting your filters or search for different dates.
      </p>
    </div>
  )
}
