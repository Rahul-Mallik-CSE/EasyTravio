'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import type { HotelReview } from '@/types/HotelSearchPageTypes'

interface HotelDetailReviewsProps {
  reviews: HotelReview[]
}

const HotelDetailReviews: React.FC<HotelDetailReviewsProps> = ({ reviews }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-extrabold text-primary">Guest Reviews</h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-[180px] max-w-[200px] bg-white border border-gray-200 rounded-sm p-4 flex-shrink-0"
          >
            {/* Avatar */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
              <Image
                src={review.avatarImage}
                alt={review.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Name + Flag */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <ReactCountryFlag
                countryCode={review.countryCode}
                svg
                style={{ width: '1.2em', height: '1.2em' }}
              />
              <span className="text-sm font-bold text-primary">{review.name}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-secondary text-center leading-relaxed line-clamp-4">
              {review.description}
            </p>

            <button className="text-theme text-xs font-semibold mt-2 hover:underline cursor-pointer">
              Read More...
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotelDetailReviews
