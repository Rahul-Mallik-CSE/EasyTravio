'use client'

import { usePathname } from 'next/navigation'
import HotelSearchBar from './HotelSearchBar'

const HotelSearchBarWrapper = () => {
    const pathname = usePathname()
    const showSearchBar = pathname === '/hotel' || pathname === '/hotel/search'

    if (!showSearchBar) return null
  return (
    <div>
      <HotelSearchBar />
    </div>
  )
}

export default HotelSearchBarWrapper
