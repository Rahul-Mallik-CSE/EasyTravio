"use client"

import Link from 'next/link'
import { MapPinOff, Home, Plane, Building2, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-background">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="relative">
          <span className="text-[120px] sm:text-[140px] font-extrabold leading-none text-muted select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <MapPinOff className="w-8 h-8 text-secondary" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Destination not found
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            The page you are looking for does not exist or has been moved. Let us help you find your way.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme text-white rounded-sm font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <Link
            href="/hotel"
            className="flex items-center gap-2 text-sm text-secondary hover:text-theme transition-colors"
          >
            <Building2 className="w-4 h-4" />
            Hotels
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/flight"
            className="flex items-center gap-2 text-sm text-secondary hover:text-theme transition-colors"
          >
            <Plane className="w-4 h-4" />
            Flights
          </Link>
        </div>
      </div>
    </div>
  )
}
