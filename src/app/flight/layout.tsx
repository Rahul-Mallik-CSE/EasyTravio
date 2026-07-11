import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSearchBarWrapper from '@/components/FlightComponents/FlightLayouts/FlightSearchBarWrapper'
import React from 'react'

const FlightLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ContentContainer>
        <FlightSearchBarWrapper />
      </ContentContainer>
      {children}
    </div>
  )
}

export default FlightLayout
