import React from 'react'

const SORT_OPTIONS = ['Cheapest', 'Fastest', 'Earliest', 'Latest']

export default function FlightSortBar({ resultCount }: { resultCount: number }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <p className="text-sm text-secondary">
        <span className="font-semibold text-foreground">{resultCount}</span> flights found
      </p>
      <div className="flex items-center gap-1 bg-card border border-card-border rounded-sm overflow-hidden shadow-sm">
        {SORT_OPTIONS.map((label, i) => (
          <span
            key={label}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer border-r border-card-border last:border-0 ${
              i === 0
                ? 'bg-theme text-white'
                : 'bg-transparent text-secondary hover:text-theme hover:bg-muted'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
