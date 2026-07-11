'use client'
import { useEffect } from 'react'
import { Plane } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchFlightDetail, resetFlightDetail } from '@/redux/FlightSlice/flightDetailSlice'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import FlightDetailBackground from './FlightDetailBackground'
import FlightDetailBackButton from './FlightDetailBackButton'
import FlightDetailCard from './FlightDetailCard'
import FlightDetailCardHeader from './FlightDetailCardHeader'
import FlightDetailHeroImage from './FlightDetailHeroImage'
import FlightDetailAirlineInfo from './FlightDetailAirlineInfo'
import FlightDetailRouteView from './FlightDetailRouteView'
import FlightDetailAmenities from './FlightDetailAmenities'
import FlightDetailPricing from './FlightDetailPricing'
import FlightDetailRating from './FlightDetailRating'
import FlightDetailActions from './FlightDetailActions'

interface FlightDetailsProps {
  flightId: string
}

export default function FlightDetails({ flightId }: FlightDetailsProps) {
  const dispatch = useAppDispatch()
  const { flight, status, error } = useAppSelector((state) => state.flightDetail)

  useEffect(() => {
    dispatch(fetchFlightDetail(flightId))
    return () => {
      dispatch(resetFlightDetail())
    }
  }, [flightId, dispatch])

  if (status === 'loading' || status === 'idle') {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <StateDisplay icon={Plane} loading title="Loading flight details…" subtitle="Please wait" />
        </div>
      </main>
    )
  }

  if (status === 'failed' || !flight) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <StateDisplay icon={Plane} title={error || 'Flight not found'} subtitle="The flight you are looking for does not exist." />
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-gray-400 overflow-hidden">
      <FlightDetailBackground />
      <FlightDetailBackButton />

      <div className="relative z-10 flex items-start justify-center px-4 py-8 min-h-[calc(100vh-5rem)]">
        <FlightDetailCard>
          <FlightDetailCardHeader flight={flight} />
          <FlightDetailHeroImage flight={flight} />
          <FlightDetailAirlineInfo flight={flight} />
          <FlightDetailRouteView flight={flight} />
          <FlightDetailAmenities flight={flight} />
          <FlightDetailPricing flight={flight} />
          <FlightDetailRating flight={flight} />
          <FlightDetailActions flight={flight} />
        </FlightDetailCard>
      </div>
    </main>
  )
}
