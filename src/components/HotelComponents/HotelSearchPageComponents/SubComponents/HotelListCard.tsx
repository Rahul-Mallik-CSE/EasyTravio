'use client'
import React from 'react'
import Image from 'next/image'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineFreeBreakfast } from 'react-icons/md'
import { IoPeopleOutline } from 'react-icons/io5'
import { LuClock4, LuSunDim } from 'react-icons/lu'
import { HiOutlinePlay, HiOutlineExclamationCircle } from 'react-icons/hi'
import { ChevronDown } from 'lucide-react'
import type { HotelSearchItem } from '@/types/HotelSearchPageTypes'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

interface HotelListCardProps {
  hotel: HotelSearchItem
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <LuSunDim
          key={i}
          className={`w-5 h-5 ${i < count ? 'text-yellow-400' : 'text-secondary'}`}
        />
      ))}
    </div>
  )
}

const HotelListCard: React.FC<HotelListCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white p-2 rounded-sm shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-visible max-h-none sm:max-h-64 hover:shadow-md transition-shadow duration-200 relative">
      {/* VIP Tag */}
      {hotel.isVip && (
        <div className="absolute -top-1.5 md:-top-1.75 -right-3 md:-right-3.25 z-20">
          <Image
            src="/images/VIPTag.png"
            alt="VIP Gifts"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
      )}

      {/* Image Section */}
      <div className="relative w-full sm:w-44 lg:w-50 shrink-0 aspect-4/3 md:aspect-auto h-48 md:h-auto overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full rounded-t-sm sm:rounded-t-none sm:rounded-l-sm object-cover hover:scale-105 transition-transform duration-500"
          width={400}
          height={300}
        />

        {/* Bottom overlay: stars + rating */}
        <div className="absolute bottom-0 left-0 right-0 sm:rounded-bl-sm px-2 py-1.5 flex items-center justify-between bg-black/30 backdrop-blur-sm">
          <StarRating count={hotel.starRating} />
          {hotel.rating !== null && (
            <span className="border border-secondary text-secondary text-xs font-semibold px-1 py-0.5 rounded">
              {hotel.rating}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col sm:flex-row flex-1 p-3 md:p-2 lg:p-4 gap-3 md:gap-0">
        {/* Main Info */}
        <div className="flex-1 pr-0 md:pr-4 h-full flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base md:text-lg lg:text-xl text-primary mb-1">{hotel.name}</h3>
            <div className="flex items-center gap-1 text-quaternary text-xs md:text-[10px] lg:text-xs mb-1">
              <IoLocationOutline className="w-3.5 h-3.5 shrink-0" />
              <span>
                Located In {hotel.location}, {hotel.city}
              </span>
            </div>
            {hotel.breakfastIncluded && (
              <div className="flex items-center gap-1 text-quaternary text-xs md:text-[10px] lg:text-xs mb-1">
                <MdOutlineFreeBreakfast className="w-3.5 h-3.5 shrink-0" />
                <span>Breakfast Included</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-quaternary text-xs md:text-[10px] lg:text-xs font-semibold">
              <div className="flex items-center gap-1">
                <IoPeopleOutline className="w-3.5 h-3.5" />
                <span>
                  {hotel.adults} Adult, {hotel.children} Children
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LuClock4 className="w-3.5 h-3.5" />
                <span>{hotel.nights} Nights</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs md:text-[10px] lg:text-xs text-secondary mb-0.5">{hotel.theme}</p>
            <p className="text-sm md:text-[10px] lg:text-xs text-quaternary font-medium mb-1">{hotel.roomType}</p>

            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-quaternary">{hotel.ratingLabel}</span>
              <span className="text-[10px] text-quaternary">, {hotel.reviewCount.toLocaleString()} Reviews</span>
              <ChevronDown className="w-4 h-4 text-quaternary" />
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex w-full sm:w-auto mt-auto">
          <div className="mt-auto w-full flex flex-row sm:flex-col items-end md:items-end justify-between md:justify-start md:min-w-20 md:text-right md:ml-auto md:pl-4">
            <div>
              {hotel.discountPercent > 0 && (
                <p className="text-red-500 text-sm font-semibold mb-0.5">{hotel.discountPercent}% Off</p>
              )}
              <p className="text-green-600 font-extrabold text-xl md:text-2xl">${hotel.pricePerNight}</p>
              <p className="text-gray-400 text-xs mb-2">Includes taxes and charges</p>

              <div className="flex items-center gap-1 justify-start md:justify-end mb-1">
                <HiOutlinePlay className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-600 text-xs">Trip Sustainable Level, {hotel.sustainabilityLevel}</span>
              </div>

              {hotel.available && hotel.discountPercent > 0 && (
                <div className="flex items-center gap-1 justify-start md:justify-end mb-2">
                  <HiOutlineExclamationCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-500 text-xs">
                    We Have {hotel.availableAtDiscount} Left at {hotel.discountPercent}% off
                  </span>
                </div>
              )}
              {!hotel.available && (
                <div className="flex items-center gap-1 justify-start md:justify-end mb-2">
                  <HiOutlineExclamationCircle className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500 text-xs">Currently unavailable</span>
                </div>
              )}
            </div>

            <Link
              href={hotel.available ? '#' : '#'}
              className={`flex items-center gap-1 text-sm md:text-xs lg:text-sm font-bold pl-3 py-0 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                hotel.available ? 'text-theme' : 'text-gray-400'
              }`}
            >
              See Availability
              <IoIosArrowForward className={`w-3.5 h-3.5 ${hotel.available ? 'text-theme' : 'text-gray-400'}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelListCard
