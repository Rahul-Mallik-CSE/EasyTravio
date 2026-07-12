'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setHotelSortBy } from '@/redux/HotelSlice/hotelFiltersSlice'
import type { HotelSortOption } from '@/types/HotelSearchPageTypes'

const SORT_OPTIONS: { label: string; value: HotelSortOption }[] = [
  { label: 'Price Low', value: 'price-asc' },
  { label: 'Price High', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating-desc' },
  { label: 'Stars', value: 'stars-desc' },
  { label: 'Distance', value: 'distance-asc' },
]

interface HotelSortBarProps {
  resultCount: number
}

export default function HotelSortBar({ resultCount }: HotelSortBarProps) {
  const dispatch = useAppDispatch()
  const currentSort = useAppSelector((state) => state.hotelFilters.sortBy)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <p className="text-sm text-secondary">
        <span className="font-semibold text-foreground">{resultCount}</span> hotels found
      </p>
      <div className="flex items-center gap-1 bg-card border border-card-border rounded-sm overflow-hidden shadow-sm">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => dispatch(setHotelSortBy(opt.value))}
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
