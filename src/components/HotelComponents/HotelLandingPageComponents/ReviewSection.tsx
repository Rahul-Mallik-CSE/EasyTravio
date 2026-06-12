
import React from "react";
import Image from "next/image";
import { reviewSectionData } from "@/data/HotelLandingPageData";
import ReviewCard from "./SubComponents/ReviewCard";


const ReviewSection: React.FC = () => {
  const { backgroundImage, reviews } = reviewSectionData;

  return (
    <section
      className="
        relative w-full overflow-hidden
        h-auto sm:h-142 md:h-152.5
        py-6 pt-16 sm:py-4 md:py-6
      "
      aria-label="Guest Reviews"
    >
      {/*  Background banner image */}
      <Image
        src={backgroundImage}
        alt="Beach background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Content container  */}
      <div
        className="
          relative z-10
          h-full max-w-7xl mx-auto
          flex sm:pt-34 justify-center
          px-4 sm:px-6 md:px-8
        "
      >
     
        <div
          className="
            w-full max-w-5xl
            flex flex-col items-center gap-20
            sm:flex-row sm:items-start sm:justify-center sm:gap-5 md:gap-8
            
          "
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;