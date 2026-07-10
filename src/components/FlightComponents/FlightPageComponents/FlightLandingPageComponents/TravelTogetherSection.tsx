import React from 'react'
import { OfferCard } from '@/components/CommonComponents/OfferCard'
import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSectionHeader from './SubComponents/FlightSectionHeader'
import FlightTravelMapBackdrop from './SubComponents/FlightTravelMapBackdrop'
import { travelTogetherCards } from '@/data/FlightLandingPageData'

const TravelTogetherSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-6">
      <ContentContainer className="space-y-5 sm:space-y-6 md:space-y-8">
        <FlightSectionHeader
          title="Let's Travel Together"
          subtitle="Discover The Latest Offers And News And Start Planning Your Next Trip With Us."
          actionLabel="See All"
        />

        <div className="relative overflow-hidden rounded-sm bg-[#084967] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <div className="relative min-h-[32rem] px-4 py-5 sm:px-6 sm:py-6 md:min-h-[38rem] md:px-8 md:py-8">
            <FlightTravelMapBackdrop />

            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
              {travelTogetherCards.map((card) => (
                <OfferCard key={card.id} card={card} mobile />
              ))}
            </div>

            <div className="relative z-10 hidden min-h-[34rem] md:block">
              {travelTogetherCards.map((card) => (
                <div key={card.id} className={`absolute ${card.desktopClassName}`}>
                  <OfferCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}

export default TravelTogetherSection
