import BannerSection from '@/components/HotelComponents/HotelLandingPageComponents/BannerSection'
import ComprasionSection from '@/components/HotelComponents/HotelLandingPageComponents/ComprasionSection'
import HotelHeroSection from '@/components/HotelComponents/HotelLandingPageComponents/HotelHeroSection'
import OffersSection from '@/components/HotelComponents/HotelLandingPageComponents/OffersSection'
import React from 'react'

const page = () => {
  return (
    <div className="w-full min-h-screen bg-transparent">
      <HotelHeroSection />

      <OffersSection />

      <ComprasionSection />

      <BannerSection />
    </div>
  )
}

export default page
