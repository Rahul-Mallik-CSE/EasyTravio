"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePlay, HiOutlineExclamationCircle } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { LuSunDim } from "react-icons/lu";
import { HotelSearchItem } from "@/types/HotelSearchPageTypes";

interface FavouriteHotelListCardProps {
  hotel: HotelSearchItem;
}

function StarRating({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <LuSunDim
          key={i}
          className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-white"}`}
        />
      ))}
    </div>
  );
}

const FavouriteHotelListCard: React.FC<FavouriteHotelListCardProps> = ({ hotel }) => {
      const [favorited, setFavorited] = useState(hotel.favourite);
  return (
    <div className="bg-white rounded-xl  shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 relative flex flex-col sm:flex-row">

      

      {/* Image Section */}
      <div className="relative w-full sm:max-w-44 aspect-4/3 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Favourite button */}
        <button
                  onClick={() => setFavorited(!favorited)}
                  className="absolute cursor-pointer top-3 left-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white/80 transition-colors duration-200 z-10"
                  aria-label="Add to favorites"
                >
                  {favorited ? (
                    <FaHeart className="w-4 h-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-4 h-4 text-white" />
                  )}
        </button>

        {/* Bottom overlay: stars + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 flex items-center justify-between bg-black/35 backdrop-blur-sm">
          <StarRating count={hotel.starRating} />
          <div className="flex items-center gap-2">
            {hotel.rating !== null && (
              <span className="border border-white/60 text-white/90 text-[11px] font-semibold px-1.5 py-0.5 rounded">
                {hotel.rating}
              </span>
            )}
            <span className="text-white/80 text-sm">👍</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3.5 flex flex-col gap-1.5">
        {/* Name */}
        <h3 className="font-bold text-base text-primary leading-tight">{hotel.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <IoLocationOutline className="w-3.5 h-3.5 shrink-0" />
          <span>{hotel.location}, {hotel.distanceToShore}</span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-gray-900 font-bold text-2xl">${hotel.pricePerNight}</span>
          {hotel.discountPercent > 0 && (
            <span className="text-red-500 text-xs font-semibold">{hotel.discountPercent}% Off</span>
          )}
        </div>

        {/* Taxes */}
        <p className="text-gray-400 text-xs -mt-1">Includes Taxes And Charges</p>

        {/* Sustainability */}
        <div className="flex items-center gap-1">
          <HiOutlinePlay className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-600 text-xs">Trip Sustainable Level, {hotel.sustainabilityLevel}</span>
        </div>

        {/* Scarcity */}
        {hotel.available && hotel.discountPercent > 0 && (
          <div className="flex items-center gap-1">
            <HiOutlineExclamationCircle className="w-3.5 h-3.5 text-red-500" />
            <span className="text-red-500 text-xs">
              We Have {hotel.availableAtDiscount} Left At {hotel.discountPercent}% Off
            </span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={hotel.available ? "/availability" : "#"}
          aria-disabled={!hotel.available}
          className={`flex items-center gap-1 text-sm font-bold mt-1 transition-colors ${
            hotel.available ? "text-blue-600 hover:text-blue-700" : "text-gray-400 pointer-events-none"
          }`}
        >
          {hotel.available ? "See Availability" : "Unavailable"}
          <IoIosArrowForward className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default FavouriteHotelListCard;