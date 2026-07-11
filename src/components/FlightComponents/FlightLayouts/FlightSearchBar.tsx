import React from 'react'
import {
  ArrowLeftRight,
  Users,
  Calendar,
  ChevronDown,
  PlaneTakeoff,
  PlaneLanding,
  Search,
  X,
} from 'lucide-react'

export default function FlightSearchBar() {
  return (
    <div className="w-full mb-2 md:mb-4 lg:mb-6">
      {/* Hero heading */}
      <div className="mb-6 ">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          Which Exciting Place Is Your Next Adventure Taking You?
        </h1>
        <p className="text-sm text-theme mt-1">Discover Exclusive Genius Rewards Wherever Your Journey Takes You!</p>
      </div>

      {/* Search card */}
      <div className="">
        {/* Trip type toggle */}
        <div className="flex items-center gap-2 mb-4">
          <button className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors bg-theme text-white border-theme cursor-pointer">
            One Way
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors bg-white text-secondary border-border hover:border-theme hover:text-theme cursor-pointer">
            Round Trip
          </button>
        </div>

        {/* Main search row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-3 items-end">
          {/* From */}
          <div className="relative">
            <label className="block text-xs text-secondary font-medium mb-1">From</label>
            <div className="relative">
              <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme" />
              <input
                type="text"
                placeholder="Select place"
                className="w-full pl-9 pr-3 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme focus:border-theme"
              />
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center items-end pb-0.5">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border border-theme text-theme hover:bg-theme hover:text-white transition-colors cursor-pointer"
              aria-label="Swap origin and destination"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="relative">
            <label className="block text-xs text-secondary font-medium mb-1">To</label>
            <div className="relative">
              <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme" />
              <input
                type="text"
                placeholder="Select place"
                className="w-full pl-9 pr-3 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme focus:border-theme"
              />
            </div>
          </div>

          {/* Passengers + Class */}
          <div className="relative">
            <label className="block text-xs text-secondary font-medium mb-1">Passengers · Class</label>
            <button className="w-full flex items-center justify-between pl-3 pr-2 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background hover:border-theme focus:outline-none focus:ring-1 focus:ring-theme cursor-pointer">
              <div className="flex items-center gap-2 min-w-0">
                <Users className="w-4 h-4 text-theme shrink-0" />
                <span className="truncate text-xs">Select passengers · Select cabin class</span>
              </div>
              <ChevronDown className="w-4 h-4 text-secondary shrink-0" />
            </button>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-xs text-secondary font-medium mb-1">Departure Date</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme" />
                <input
                  type="text"
                  placeholder="Select date"
                  aria-label="Select departure date"
                  className="w-full pl-9 pr-2 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme focus:border-theme"
                />
              </div>
            </div>
          </div>

          {/* Search button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex items-center justify-center gap-2 bg-theme text-white px-6 py-2.5 rounded-sm font-semibold text-sm hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer whitespace-nowrap">
              <Search className="w-4 h-4" />
              Find Flights
            </button>
            <button className="flex items-center justify-center gap-2 border border-border bg-white text-secondary px-5 py-2.5 rounded-sm font-semibold text-sm hover:border-theme hover:text-theme transition-colors cursor-pointer whitespace-nowrap">
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
