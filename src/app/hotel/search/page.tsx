import HotelSearchResultAndFilterSection from '@/components/HotelComponents/HotelSearchPageComponents/HotelSearchResultAndFilterSection'
import MapSection from '@/components/HotelComponents/HotelSearchPageComponents/MapSection'
import React from 'react'

const SearchPage = () => {
  return (
    <div className="w-full min-h-screen bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MapSection />
            <HotelSearchResultAndFilterSection />
        </div>
    </div>
  )
}

export default SearchPage
