'use client'

import { Suspense } from 'react'
import FlightSearchBar from './FlightSearchBar'
import { usePathname } from 'next/navigation'

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
