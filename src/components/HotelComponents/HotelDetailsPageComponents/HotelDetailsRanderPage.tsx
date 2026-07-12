'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchHotelDetail, resetHotelDetail } from '@/redux/HotelSlice/hotelDetailSlice'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import { Building2 } from 'lucide-react'
import HotelFullyBookedPage from './HotelFullyBookedPage'
import HotelAvailableDetailsPage from './HotelAvailableDetailsPage'

interface HotelDetailsRanderPageProps {
  hotelId: string
}

const HotelDetailsRanderPage: React.FC<HotelDetailsRanderPageProps> = ({ hotelId }) => {
  const dispatch = useAppDispatch()
  const { hotel, status, error } = useAppSelector((state) => state.hotelDetail)

  useEffect(() => {
    dispatch(fetchHotelDetail(hotelId))
    return () => {
      dispatch(resetHotelDetail())
    }
  }, [hotelId, dispatch])

  if (status === 'loading') {
    return (
      <StateDisplay
        icon={Building2}
        loading
        title="Loading hotel details…"
        subtitle="Please wait while we fetch the information"
      />
    )
  }

  if (status === 'failed' || !hotel) {
    return (
      <StateDisplay
        icon={Building2}
        title="Hotel not found"
        subtitle={error || "The hotel you're looking for doesn't exist."}
      />
    )
  }

  if (!hotel.available) {
    return <HotelFullyBookedPage hotel={hotel} />
  }

  return <HotelAvailableDetailsPage hotel={hotel} />
}

export default HotelDetailsRanderPage
