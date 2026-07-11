'use client'
import Link from 'next/link'
import { Box, Share2, HelpCircle } from 'lucide-react'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailActionsProps {
  flight: FlightDetail
}

export default function FlightDetailActions({ flight }: FlightDetailActionsProps) {
  return (
    <div className="px-5 py-4 border-t border-card-border">
      <div className="flex items-center gap-3">
        <button className="flex flex-col items-center gap-0.5 text-xs text-secondary hover:text-theme transition-colors cursor-pointer">
          <Box className="w-5 h-5" />
          3d View
        </button>
        <button
          onClick={() => navigator.share?.({ title: `Flight ${flight.flightNumber}`, url: window.location.href }).catch(() => { })}
          className="flex flex-col items-center gap-0.5 text-xs text-secondary hover:text-theme transition-colors cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
        <button className="flex flex-col items-center gap-0.5 text-xs text-secondary hover:text-theme transition-colors cursor-pointer">
          <HelpCircle className="w-5 h-5" />
          Help
        </button>
        <Link
          href={`/flight/book/${flight.id}`}
          className="flex-1 bg-theme text-white text-center py-2.5 rounded-sm text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Purchase The Flight
        </Link>
      </div>
    </div>
  )
}
