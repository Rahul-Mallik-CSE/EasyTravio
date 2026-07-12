'use client'
import React from 'react'

interface ReviewRates {
  staffPoliteness: number
  vipOptions: number
  freeWifiSpeed: number
  cleanliness: number
  accessToCityCenter: number
}

interface HotelDetailReviewRatesProps {
  reviewRates: ReviewRates
}

const RATE_LABELS: { key: keyof ReviewRates; label: string }[] = [
  { key: 'staffPoliteness', label: 'Staff Politeness' },
  { key: 'vipOptions', label: 'VIP Options' },
  { key: 'freeWifiSpeed', label: 'Free Wi-Fi Speed' },
  { key: 'cleanliness', label: 'Cleanliness' },
  { key: 'accessToCityCenter', label: 'Access To City Center' },
]

const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-600'
  if (rating >= 6) return 'text-yellow-600'
  return 'text-red-500'
}

const getProgressBarColor = (rating: number): string => {
  if (rating >= 8) return 'bg-green-500'
  if (rating >= 6) return 'bg-yellow-500'
  return 'bg-red-500'
}

const HotelDetailReviewRates: React.FC<HotelDetailReviewRatesProps> = ({ reviewRates }) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-extrabold text-primary mb-6">Review Rates:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {RATE_LABELS.map(({ key, label }) => (
          <div key={key} className="text-center">
            <p className="text-xs md:text-sm text-secondary mb-2">{label}</p>
            <p className={`text-xl md:text-2xl font-extrabold ${getRatingColor(reviewRates[key])}`}>
              {reviewRates[key]}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full ${getProgressBarColor(reviewRates[key])}`}
                style={{ width: `${(reviewRates[key] / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotelDetailReviewRates
