'use client';

import { PastOffer } from "@/types/HomePageTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PastOfferCardProps {
  offer: PastOffer;
}

const PastOfferCard: React.FC<PastOfferCardProps> = ({ offer }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(offer.href || '/hotel/search')}
      className="bg-white rounded-sm p-2 overflow-hidden border border-card-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm">
        <Image
          src={offer.image}
          alt={offer.type}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          width={400}
          height={300}
        />

        {/* Bottom overlay: review count + rating */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between bg-black/30 backdrop-blur-sm">
          <span className="text-white text-sm font-bold">{offer.reviewCount.toLocaleString()} Reviews</span>
          <span className="border border-secondary text-secondary text-xs font-semibold px-1 py-0.5 rounded">
            {offer.rating.toFixed(1)}
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
