import React from 'react'
import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSectionHeader from './SubComponents/FlightSectionHeader'
import BackPackingContent from './SubComponents/BackPackingContent'

const FallIntoTravelSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-6">
      <ContentContainer className="space-y-5 sm:space-y-6 md:space-y-8">

        {/* Section header for the "Fall Into Travel" section, including an eyebrow, title, subtitle, and action label. */}
        <FlightSectionHeader
          eyebrow="Review Affordable EasySet 24 Trip Packages"
          title="Fall Into Travel"
          subtitle="Going Somewhere To Celebrate This Season? Whether You&apos;re Going Home Or Somewhere To Roam, We&apos;ve Got The Travel Tools To Get You To Your Destination."
          actionLabel="See All"
          />

        {/* BackPackingContent component that displays the content for the "Fall Into Travel" section, including a grid layout with text and images. */}
        <BackPackingContent />
        
      </ContentContainer>
    </section>
  )
}

export default FallIntoTravelSection
