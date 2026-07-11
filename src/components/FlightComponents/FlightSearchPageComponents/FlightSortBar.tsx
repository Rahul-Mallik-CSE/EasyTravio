'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSortBy } from '@/redux/FlightSlice/filtersSlice'
import type { SortOption } from '@/types/FlightAllTypes'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Cheapest', value: 'price-asc' },
  { label: 'Fastest', value: 'duration-asc' },
  { label: 'Earliest', value: 'departure-asc' },
  { label: 'Latest', value: 'departure-desc' },
]

interface FlightSortBarProps {
  resultCount: number
}

export default function FlightSortBar({ resultCount }: FlightSortBarProps) {
  const dispatch = useAppDispatch()
  const currentSort = useAppSelector((state) => state.filters.sortBy)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <p className="text-sm text-secondary">
        <span className="font-semibold text-foreground">{resultCount}</span> flights found
      </p>
      <div className="flex items-center gap-1 bg-card border border-card-border rounded-sm overflow-hidden shadow-sm">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => dispatch(setSortBy(opt.value))}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer border-r border-card-border last:border-0 ${
              currentSort === opt.value
                ? 'bg-theme text-white'
                : 'bg-transparent text-secondary hover:text-theme hover:bg-muted'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
