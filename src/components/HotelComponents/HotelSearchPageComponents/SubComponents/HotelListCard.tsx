"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { HiOutlinePlay} from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ChevronDown } from "lucide-react";
import { HotelSearchItem } from "@/types/HotelSearchPageTypes";

interface HotelListCardProps {
  hotel: HotelSearchItem;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < count ? "text-yellow-400" : "text-white/50"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const HotelListCard: React.FC<HotelListCardProps> = ({ hotel }) => {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden max-h-none md:max-h-64 hover:shadow-md transition-shadow duration-200 relative">
      {/* VIP Tag */}
      {hotel.isVip && (
        <div className="absolute top-0 right-0 z-20">
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
      <div className="relative w-full md:w-56 lg:w-64 flex-shrink-0 aspect-4/3 md:aspect-auto md:h-auto overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          width={400}
          height={300}
        />
        {/* Heart Button */}
        <button
          onClick={() => setFavorited(!favorited)}
          className="absolute cursor-pointer top-3 left-3 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white/80 transition-colors duration-200 z-10"
          aria-label="Add to favorites"
        >
          {favorited ? (
            <FaHeart className="w-4 h-4 text-red-500" />
          ) : (
            <FaRegHeart className="w-4 h-4 text-white" />
          )}
        </button>

        {/* Bottom overlay: stars + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between bg-black/30 backdrop-blur-sm">
          <StarRating count={hotel.starRating} />
          {hotel.rating !== null && (
            <span className="border border-sky-400 text-sky-400 text-xs font-semibold px-1 py-0.5 rounded">
              {hotel.rating}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row flex-1 p-3 md:p-4 gap-3 md:gap-0">
        {/* Main Info */}
        <div className="flex-1 pr-0 md:pr-4">
          <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
            <IoLocationOutline className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              Located In {hotel.location},{" "}
              <span className="text-sky-500 underline cursor-pointer">{hotel.distanceToShore}</span>
            </span>
          </div>
          {hotel.breakfastIncluded && (
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
              <MdOutlineFreeBreakfast className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Breakfast Included</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
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

          {/* Theme / Room Type */}
          <p className="text-xs text-gray-400 mb-0.5">{hotel.theme}</p>
          <p className="text-sm text-gray-700 font-medium mb-2">{hotel.roomType}</p>

          {/* Rating Label */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-800">{hotel.ratingLabel}</span>
            <span className="text-xs text-gray-400">, {hotel.reviewCount.toLocaleString()} Reviews</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start md:min-w-[160px] md:text-right md:ml-auto border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4">
          <div>
            {hotel.discountPercent > 0 && (
              <p className="text-red-500 text-sm font-semibold mb-0.5">{hotel.discountPercent}% Off</p>
            )}
            <p className="text-green-600 font-extrabold text-xl md:text-2xl">${hotel.pricePerNight}</p>
            <p className="text-gray-400 text-xs mb-2">Includes taxes and charges</p>

            {/* Sustainability */}
            <div className="flex items-center gap-1 justify-start md:justify-end mb-1">
              <HiOutlinePlay className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-600 text-xs">Trip Sustainable Level, {hotel.sustainabilityLevel}</span>
            </div>

            {/* Availability warning */}
            {hotel.discountPercent > 0 && (
              <div className="flex items-center gap-1 justify-start md:justify-end mb-2">
                <HiOutlineExclamationCircle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-red-500 text-xs">
                  We Have {hotel.availableAtDiscount} Left at {hotel.discountPercent}% off
                </span>
              </div>
            )}
          </div>

          <button className="flex items-center gap-1 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap mt-auto">
            See Availability
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelListCard;