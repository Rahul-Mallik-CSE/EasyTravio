'use client';

import { TrendingDestination } from "@/types/HomePageTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
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
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/hotel/search?destination=${encodeURIComponent(destination.city)}`)}
      className="bg-white rounded-sm p-2 overflow-hidden border border-card-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.city}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          width={400}
          height={300}
        />

        {/* Bottom overlay: stars + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between bg-black/30 backdrop-blur-sm">
          <StarRating />
          {destination.rating !== null && (
            <span className="border border-secondary text-secondary text-xs font-semibold px-1 py-0.5 rounded">
              {destination.rating}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="py-4 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-extrabold text-primary leading-tight">{destination.city}</h3>
        <p className="text-sm md:text-base font-bold text-secondary uppercase tracking-wide">{destination.category}</p>
        <p className="text-[10px] md:text-xs font-semibold text-primary mt-2">{destination.dateRange}</p>
        <p className="text-[10px] text-primary mt-2 leading-relaxed line-clamp-2">{destination.description}</p>
      </div>
    </div>
  );
};

export default TrendingCard;
