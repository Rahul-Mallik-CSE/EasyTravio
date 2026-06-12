import BannerSection from '@/components/HotelComponents/HotelLandingPageComponents/BannerSection'
import ComprasionSection from '@/components/HotelComponents/HotelLandingPageComponents/ComprasionSection'
import HotelHeroSection from '@/components/HotelComponents/HotelLandingPageComponents/HotelHeroSection'
import OffersSection from '@/components/HotelComponents/HotelLandingPageComponents/OffersSection'
import ReviewSection from '@/components/HotelComponents/HotelLandingPageComponents/ReviewSection'
import React from 'react'

const page = () => {
  return (
    <div className="w-full min-h-screen bg-transparent">
      <HotelHeroSection />

      <OffersSection />

      <ComprasionSection />

      <ReviewSection />

      <BannerSection />
    </div>
  )
}

export default page
