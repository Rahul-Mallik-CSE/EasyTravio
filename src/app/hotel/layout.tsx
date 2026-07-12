import HotelSearchBarWrapper from '@/components/HotelComponents/HotelLayouts/HotelSearchBarWrapper'
import React from 'react'

const HotelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      
      <HotelSearchBarWrapper />
      
      {children}
    </div>
  )
}

export default HotelLayout
