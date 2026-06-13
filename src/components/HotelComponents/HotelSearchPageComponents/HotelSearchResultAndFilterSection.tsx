"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HotelFilterSide from "./SubComponents/HotelFilterSide";
import HotelSearchResultSide from "./SubComponents/HotelSearchResultSide";
import { hotelSearchData, defaultFilterState } from "@/data/HotelSearchPageData";
import { FilterState, HotelSearchItem } from "@/types/HotelSearchPageTypes";

const INITIAL_VISIBLE = 5;
const LOAD_MORE_COUNT = 5;

function applyFilters(hotels: HotelSearchItem[], filters: FilterState): HotelSearchItem[] {
  return hotels.filter((hotel) => {
    // Price range
    if (hotel.pricePerNight < filters.minPrice || hotel.pricePerNight > filters.maxPrice) return false;

    // Breakfast
    if (filters.breakfastIncluded && !hotel.breakfastIncluded) return false;

    // Guest rating
    if (filters.guestRating === "outstanding" && hotel.rating < 9) return false;
    if (filters.guestRating === "veryGood" && hotel.rating < 8) return false;
    if (filters.guestRating === "good" && hotel.rating < 7) return false;
    if (filters.guestRating === "excellent" && hotel.rating < 8.5) return false;
    if (filters.guestRating === "poor" && hotel.rating >= 7) return false;

    return true;
  });
}

const HotelSearchResultAndFilterSection = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [debouncedFilters, setDebouncedFilters] = useState<FilterState>(defaultFilterState);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFilterChange = useCallback((partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  // Debounce filter application
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedFilters(filters);
      setVisibleCount(INITIAL_VISIBLE); // reset on filter change
    }, 350);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [filters]);

  const filteredHotels = applyFilters(hotelSearchData, debouncedFilters);
  const hasMore = visibleCount < filteredHotels.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  const handleFavourites = () => {
    router.push("/favourite-hotel");
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Mobile Filter Button */}
      <div className="flex md:hidden justify-between items-center mb-4">
        <p className="text-sm text-gray-600 font-medium">
          {filteredHotels.length} hotels found
        </p>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 border border-sky-500 text-sky-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sky-50 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto p-5">
            <HotelFilterSide filters={filters} onFilterChange={handleFilterChange} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Filter Sidebar — desktop only */}
        <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            <HotelFilterSide filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <HotelSearchResultSide
            hotels={filteredHotels}
            visibleCount={visibleCount}
            onLoadMore={handleLoadMore}
          />

          {/* Bottom Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleFavourites}
              className="flex-1 flex items-center justify-center gap-2 border border-sky-600 text-sky-600 font-semibold text-sm rounded-xl px-6 py-3 hover:bg-sky-50 transition-colors duration-200"
            >
              List Your Favourite Places
              <Heart className="w-4 h-4" />
            </button>

            {hasMore && (
              <button
                onClick={handleLoadMore}
                className="flex-1 flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors duration-200"
              >
                See More Search Results
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSearchResultAndFilterSection;