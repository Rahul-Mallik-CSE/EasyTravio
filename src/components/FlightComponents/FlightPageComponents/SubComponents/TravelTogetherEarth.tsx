import ContentContainer from '@/components/CommonComponents/ContentContainer'
import { travelTogetherCards } from '@/data/FlightLandingPageData'
import OfferCard from './OfferCard'

const TravelTogetherEarth = () => {
  return (
    <div className="w-full overflow-hidden bg-[#043E5F]">
        <ContentContainer>
          <div className="relative overflow-hidden rounded-sm bg-[url('/FlightImages/Glob.png')] bg-cover bg-center">
            <div className="relative  px-4 py-5 sm:px-6 sm:py-6 md:min-h-105 lg:min-h-122 md:px-8 md:py-8">
       
                {/* For mobile view, the cards are displayed in a grid layout with column on small screens */}
              <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                {travelTogetherCards.map((card) => (
                  <OfferCard key={card.id} card={card} mobile />
                ))}
              </div>

                {/* For desktop view, the cards are positioned absolutely based on their desktopClassName */}
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
  )
}

export default TravelTogetherEarth
