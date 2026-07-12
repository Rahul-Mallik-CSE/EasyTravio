import React from 'react'
import HotelHeroSection from './HotelHeroSection'
import OffersSection from './OffersSection'
import ComprasionSection from './ComprasionSection'
import ReviewSection from './ReviewSection'
import BannerSection from './BannerSection'

const HotelLandingPage = () => {
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

export default HotelLandingPage
