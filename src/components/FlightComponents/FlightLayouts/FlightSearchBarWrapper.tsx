'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import FlightSearchBar from './FlightSearchBar'

export default function FlightSearchBarWrapper() {
  const pathname = usePathname()
  const showSearchBar = pathname === '/flight' || pathname === '/flight/search'

  if (!showSearchBar) return null

  return (
    <Suspense>
      <FlightSearchBar />
    </Suspense>
  )
}
