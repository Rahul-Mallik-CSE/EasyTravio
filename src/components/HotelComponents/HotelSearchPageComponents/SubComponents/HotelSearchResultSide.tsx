'use client'
import React from 'react'
import HotelListCard from './HotelListCard'
import type { HotelSearchItem } from '@/types/HotelSearchPageTypes'

interface HotelSearchResultSideProps {
  hotels: HotelSearchItem[]
}

const HotelSearchResultSide: React.FC<HotelSearchResultSideProps> = ({ hotels }) => {
  return (
    <div className="flex flex-col gap-4 flex-1 min-w-0">
      {hotels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-500 text-base font-medium">No hotels match your filters.</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        hotels.map((hotel) => <HotelListCard key={hotel.id} hotel={hotel} />)
      )}
    </div>
  )
}

export default HotelSearchResultSide
