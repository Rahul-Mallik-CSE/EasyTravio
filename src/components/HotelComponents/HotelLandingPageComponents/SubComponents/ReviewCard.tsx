
import React from "react";
import Image from "next/image";
import { ReviewItem } from "@/types/HotelLandingPageTypes";

interface ReviewCardProps {
  review: ReviewItem;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      className="
            relative flex flex-col pt-14 sm:pt-16 pb-6 px-5 sm:px-6
            rounded-sm
            bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.3),rgba(0,0,0,0.3))]
            backdrop-blur-xs
            shadow-[0_8px_32px_rgba(0,0,0,0.35)]
            w-full sm:max-w-63 mx-auto
            h-36 sm:h-54 
            transition-transform duration-300 hover:-translate-y-1
            "
    >
      {/*  Avatar  */}
      <div
        className="
          absolute -top-10 sm:-top-12
          left-1/2 -translate-x-1/2
          w-20 h-20 sm:w-24 sm:h-24
          rounded-full
          ring-none
          overflow-hidden
          shadow-lg
        "
      >
        <Image
          src={review.avatarImage}
          alt={review.name}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover"
        />
      </div>

      {/*  Name row  */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg sm:text-xl leading-none" aria-label={`Flag of ${review.countryCode}`}>
          {review.flagEmoji}
        </span>
        <span
          className="
            text-white font-bold
            text-sm sm:text-sm md:text-base
            leading-tight tracking-wide
          "
        >
          {review.name}
        </span>
      </div>

      {/*  Description */}
      <p
        className="
          text-white/85 leading-relaxed
          text-[10px] md:text-xs
        "
      >
        {review.description}
      </p>
    </div>
  );
};

export default ReviewCard;