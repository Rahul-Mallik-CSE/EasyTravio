import React from 'react'
import FlightHeroSection from './FlightHeroSection'
import TravelTogetherSection from './TravelTogetherSection'
import FallIntoTravelSection from './FallIntoTravelSection'

const FlightLandingPage = () => {
  return (
    <div className='w-full space-y-6 bg-background pb-8 sm:space-y-8 md:space-y-10 lg:space-y-12 lg:pb-12'>
      <FlightHeroSection />
      <TravelTogetherSection />
      <FallIntoTravelSection />
    </div>
  )
}

export default FlightLandingPage
