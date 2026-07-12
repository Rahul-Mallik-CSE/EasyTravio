'use client'
import React from 'react'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'
import HotelDetailGallery from './SubComponents/HotelDetailGallery'
import HotelDetailTabs from './SubComponents/HotelDetailTabs'
import HotelDetailGuestInfo from './SubComponents/HotelDetailGuestInfo'
import HotelDetailFAQ from './SubComponents/HotelDetailFAQ'
import HotelDetailReviews from './SubComponents/HotelDetailReviews'
import HotelDetailReviewRates from './SubComponents/HotelDetailReviewRates'

interface HotelAvailableDetailsPageProps {
  hotel: HotelDetail
}

const HotelAvailableDetailsPage: React.FC<HotelAvailableDetailsPageProps> = ({ hotel }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      {/* Gallery */}
      <HotelDetailGallery gallery={hotel.gallery} hotelName={hotel.name} />

      {/* Content */}
      <div className="mt-6 space-y-8">
        {/* Tabs */}
        <HotelDetailTabs
          description={hotel.description}
          rules={hotel.rules}
          checkInTime={hotel.checkInTime}
          checkOutTime={hotel.checkOutTime}
        />

        {/* Amenities & Guest Info */}
        <HotelDetailGuestInfo hotel={hotel} />

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* FAQ */}
        <HotelDetailFAQ faqs={hotel.faqs} />

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Reviews */}
        <HotelDetailReviews reviews={hotel.reviews} />

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Review Rates */}
        <HotelDetailReviewRates reviewRates={hotel.reviewRates} />
      </div>
    </div>
  )
}

export default HotelAvailableDetailsPage
