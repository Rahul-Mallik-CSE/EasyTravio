"use client";
import React from "react";
import HotelListCard from "./HotelListCard";
import { HotelSearchItem } from "@/types/HotelSearchPageTypes";

interface HotelSearchResultSideProps {
  hotels: HotelSearchItem[];
  visibleCount: number;
  onLoadMore: () => void;
}

const HotelSearchResultSide: React.FC<HotelSearchResultSideProps> = ({
  hotels,
  visibleCount,
  onLoadMore,
}) => {
  const visible = hotels.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4 flex-1 min-w-0">
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-500 text-base font-medium">No hotels match your filters.</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        visible.map((hotel) => <HotelListCard key={hotel.id} hotel={hotel} />)
      )}
    </div>
  );
};

export default HotelSearchResultSide;