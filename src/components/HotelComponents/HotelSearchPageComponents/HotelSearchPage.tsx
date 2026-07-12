import ContentContainer from '@/components/CommonComponents/ContentContainer'
import HotelSearchResultsSection from './HotelSearchResultsSection'

const HotelSearchPage = () => {
  return (
    <div className="w-full min-h-screen bg-transparent">
      <ContentContainer>
        <HotelSearchResultsSection />
      </ContentContainer>
    </div>
  )
}

export default HotelSearchPage
