'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
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
  const router = useRouter()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      {/* Header with back button and hotel name */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-muted transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary">
            {hotel.name}
          </h1>
          <p className="text-sm text-secondary mt-0.5">
            {hotel.location}, {hotel.city}
          </p>
        </div>
      </div>

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
