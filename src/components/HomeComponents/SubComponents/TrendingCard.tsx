'use client';

import { TrendingDestination } from "@/types/HomePageTypes";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { LuSunDim } from "react-icons/lu";

interface TrendingCardProps {
  destination: TrendingDestination;
}

const StarRating = () => (
  <div className="flex items-center gap-0.5">
    {[...Array(4)].map((_, i) => (
      <LuSunDim key={i} className="w-5 h-5 text-white" />
    ))}
  </div>
);

const TrendingCard: React.FC<TrendingCardProps> = ({ destination }) => {
  const [favorited, setFavorited] = useState(destination.isFavorited ?? false);

  return (
    <div className="bg-white rounded-sm p-2 overflow-hidden border border-card-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        
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
          className="absolute cursor-pointer top-3 left-3 w-7 h-7 rounded-full bg-tertiary backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors duration-200 z-10"
          aria-label="Add to favorites"
        >
          <FaRegHeart
            className={`w-4 h-4 transition-colors duration-200 ${
              favorited ? "text-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Bottom overlay: stars + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between bg-black/30 backdrop-blur-sm">
          {/* <div className="flex gap-1 text-white text-2xl"><LuSunDim /><LuSunDim /><LuSunDim /><LuSunDim /></div> */}
          <StarRating />
          {destination.rating !== null && (
            <span className=" border border-secondary text-secondary text-xs font-semibold px-1 py-0.5 rounded">
              {destination.rating}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col  flex-1">
        <h3 className="text-lg md:text-xl font-extrabold text-primary leading-tight">{destination.city}</h3>
        <p className="text-sm md:text-base font-bold text-secondary uppercase tracking-wide">{destination.category}</p>
        <p className="text-[10px] md:text-xs font-semibold text-primary mt-2">{destination.dateRange}</p>
        <p className="text-[10px] text-primary mt-2 leading-relaxed">{destination.description}</p>
      </div>
    </div>
  );
};

export default TrendingCard;