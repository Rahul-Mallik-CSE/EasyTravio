import ContentContainer from '@/components/CommonComponents/ContentContainer'
import MapSection from './MapSection'
import HotelSearchResultAndFilterSection from './HotelSearchResultAndFilterSection'


const HotelSearchPage = () => {
  return (
    <div className="w-full min-h-screen bg-transparent">
        <ContentContainer>
            <MapSection />
            <HotelSearchResultAndFilterSection />
        </ContentContainer>
    </div>
  )
}

export default HotelSearchPage
