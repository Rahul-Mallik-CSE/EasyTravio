import HotelSearchBar from '@/components/HotelComponents/HotelSearchBar'
import React, { Suspense } from 'react'

const HotelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense>
        <HotelSearchBar />
      </Suspense>
      {children}
    </div>
  )
}

export default HotelLayout
