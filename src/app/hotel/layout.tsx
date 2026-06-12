import HotelSearchBar from '@/components/HotelComponents/HotelSearchBar'
import React from 'react'

const HotelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HotelSearchBar />
      {children}
    </div>
  )
}

export default HotelLayout
