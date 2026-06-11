'use client';

import { PastOffer } from "@/types/HomePageTypes";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";

interface PastOfferCardProps {
  offer: PastOffer;
}

const PastOfferCard: React.FC<PastOfferCardProps> = ({ offer }) => {
  const [favorited, setFavorited] = useState(offer.isFavorited ?? false);

  return (
    <div className="bg-white rounded-sm p-2 overflow-hidden border border-card-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm">
        <Image
          src={offer.image}
          alt={offer.type}
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

        {/* Bottom overlay: review count + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between bg-black/30 backdrop-blur-sm">
          <span className="text-white text-sm font-bold">{offer.reviewCount}</span>
          <span className="border border-secondary text-secondary text-xs font-semibold px-1 py-0.5 rounded">
            {offer.rating.toFixed(1).replace(".", ",")}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="py-1">
        <h3 className="text-base md:text-lg font-extrabold text-primary leading-tight">
          {offer.type}
        </h3>
      </div>
    </div>
  );
};

export default PastOfferCard;