'use client'

import { usePathname } from 'next/navigation'
import HotelSearchBar from './HotelSearchBar'
import { Suspense } from 'react'

const HotelSearchBarWrapper = () => {
    const pathname = usePathname()
    const showSearchBar = pathname === '/hotel' || pathname === '/hotel/search'

    if (!showSearchBar) return null
  return (
    <Suspense>
      <HotelSearchBar />
    </Suspense>
  )
}

export default HotelSearchBarWrapper
