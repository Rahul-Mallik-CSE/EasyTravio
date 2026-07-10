import React from 'react'
import { OfferCard } from '@/components/FlightComponents/FlightPageComponents/FlightLandingPageComponents/SubComponents/OfferCard'
import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSectionHeader from './SubComponents/FlightSectionHeader'
import { travelTogetherCards } from '@/data/FlightLandingPageData'

const TravelTogetherSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-6">
      <ContentContainer className="pb-4 sm:pb-6 md:pb-8">
        <FlightSectionHeader
          title="Let's Travel Together"
          subtitle="Discover The Latest Offers And News And Start Planning Your Next Trip With Us."
          actionLabel="See All"
        />
      </ContentContainer>
      <div className="w-full overflow-hidden bg-[#043E5F]">
        <ContentContainer>
          <div className="relative overflow-hidden rounded-sm bg-[url('/FlightImages/Glob.png')] bg-cover bg-center">
            <div className="relative  px-4 py-5 sm:px-6 sm:py-6 md:min-h-105 lg:min-h-122 md:px-8 md:py-8">
       

              <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                {travelTogetherCards.map((card) => (
                  <OfferCard key={card.id} card={card} mobile />
                ))}
              </div>

              <div className="relative z-10 hidden  md:block">
                {travelTogetherCards.map((card) => (
                  <div key={card.id} className={`absolute ${card.desktopClassName}`}>
                    <OfferCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </section>
  )
}

export default TravelTogetherSection
