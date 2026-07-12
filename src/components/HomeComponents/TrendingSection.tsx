'use client'

import { trendingDestinations } from "@/data/HomePageData";
import React from "react";
import TrendingCard from "./SubComponents/TrendingCard";
import Link from "next/link";

const TrendingSection = () => {
  return (
    <section className="w-full bg-background py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-primary leading-none">
              Explore Stays In Trending Destinations
            </h2>
            <p className="text-sm md:text-base font-bold text-gray-700 mt-1">Find Hot Stays!</p>
          </div>
          <Link
            href="/hotel/search"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-theme text-theme text-sm font-semibold hover:bg-theme hover:text-white transition-all duration-200"
          >
            View All
          </Link>
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
