'use client'
import { useParams } from 'next/navigation'
import FlightBookingPage from '@/components/FlightComponents/FlightBookingPageComponents/FlightBookingPage'

const FlightBookingMainPage = () => {
  const params = useParams()
  const flightId = params.flightId as string

  return <FlightBookingPage flightId={flightId} />
}

export default FlightBookingMainPage
