import HotelDetailsRanderPage from '@/components/HotelComponents/HotelDetailsPageComponents/HotelDetailsRanderPage'
import React from 'react'

interface DetailsPageProps {
  params: Promise<{ hotelId: string }>
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { hotelId } = await params
  return <HotelDetailsRanderPage hotelId={hotelId} />
}

export default DetailsPage
