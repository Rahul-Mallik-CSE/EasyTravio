import { trendingDestinations } from "@/data/HomePageData";
import React from "react";
import TrendingCard from "./SubComponents/TrendingCard";


const TrendingSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-6">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-primary leading-none">
            Explore Stays In Trending Destinations
          </h2>
          <p className="text-sm md:text-base font-bold text-gray-700 mt-1">Find Hot Stays!</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {trendingDestinations.map((destination) => (
            <TrendingCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;