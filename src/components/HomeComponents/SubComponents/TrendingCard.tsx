'use client';

import { TrendingDestination } from "@/types/HomePageTypes";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface TrendingCardProps {
  destination: TrendingDestination;
}

const StarRating = () => (
  <div className="flex items-center gap-0.5">
    {[...Array(4)].map((_, i) => (
      <FaStar key={i} className="w-3.5 h-3.5 text-white/60" />
    ))}
  </div>
);

const TrendingCard: React.FC<TrendingCardProps> = ({ destination }) => {
  const [favorited, setFavorited] = useState(destination.isFavorited ?? false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        
        <Image
          src={destination.image}
          alt={destination.city}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          width={400}
          height={300}
        />
        {/* Heart / Favorite Button */}
        <button
          onClick={() => setFavorited(!favorited)}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors duration-200 z-10"
          aria-label="Add to favorites"
        >
          <FaRegHeart
            className={`w-4 h-4 transition-colors duration-200 ${
              favorited ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Bottom overlay: stars + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent">
          <StarRating />
          {destination.rating !== null && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded">
              {destination.rating}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">{destination.city}</h3>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{destination.category}</p>
        <p className="text-xs font-semibold text-gray-700 mt-1">{destination.dateRange}</p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{destination.description}</p>
      </div>
    </div>
  );
};

export default TrendingCard;