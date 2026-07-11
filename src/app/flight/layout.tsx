import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSearchBar from '@/components/FlightComponents/FlightLayouts/FlightSearchBar'
import React from 'react'

const FlightLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ContentContainer>
        <FlightSearchBar />
      </ContentContainer>
      {children}
    </div>
  )
}

export default FlightLayout
