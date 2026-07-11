'use client'
import { useParams } from 'next/navigation'
import FlightDetails from '@/components/FlightComponents/FlightDetailsPageComponents/FlightDetails'

const FlightDetailsPage = () => {
  const params = useParams()
  const flightId = params.flightId as string

  return <FlightDetails flightId={flightId} />
}

export default FlightDetailsPage
