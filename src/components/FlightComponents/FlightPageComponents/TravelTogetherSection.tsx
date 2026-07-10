import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSectionHeader from './SubComponents/FlightSectionHeader'
import TravelTogetherEarth from './SubComponents/TravelTogetherEarth'

const TravelTogetherSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-6">

      {/* Section header  */}
      <ContentContainer className="pb-4 sm:pb-6 md:pb-8">
        <FlightSectionHeader
          title="Let's Travel Together"
          subtitle="Discover The Latest Offers And News And Start Planning Your Next Trip With Us."
          actionLabel="See All"
        />
      </ContentContainer>

      {/* Travel together earth cards */}
      <TravelTogetherEarth />
    </section>
  )
}

export default TravelTogetherSection
