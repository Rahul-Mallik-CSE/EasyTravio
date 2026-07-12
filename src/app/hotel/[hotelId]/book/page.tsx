import HotelBookingPage from '@/components/HotelComponents/HotelBookingPageComponents/HotelBookingPage'
import React from 'react'

interface BookingPageProps {
  params: Promise<{ hotelId: string }>
}

const BookPage = async ({ params }: BookingPageProps) => {
  const { hotelId } = await params
  return <HotelBookingPage hotelId={hotelId} />
}

export default BookPage
