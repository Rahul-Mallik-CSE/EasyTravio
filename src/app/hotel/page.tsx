import HotelHeroSection from '@/components/HotelComponents/HotelLandingPageComponents/HotelHeroSection'
import OffersSection from '@/components/HotelComponents/HotelLandingPageComponents/OffersSection'
import React from 'react'

const page = () => {
  return (
    <div className="w-full min-h-screen bg-transparent">
      <HotelHeroSection />

      <OffersSection />
    </div>
  )
}

export default page
