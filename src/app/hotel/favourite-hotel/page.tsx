import React from "react";
import FavouriteHotelListCard from "@/components/HotelComponents/FavouriteHotelPageComponents/FavouriteHotelListCard";
import { hotelSearchData } from "@/data/HotelSearchPageData";

const FavouriteHotelPage = () => {
  const favouriteHotels = hotelSearchData.filter((hotel) => hotel.favourite);

  return (
    <div className="w-full bg-[#fafafa]">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-primary mb-6 sm:mb-8">
          Hotel Favourites
        </h1>

        {favouriteHotels.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
            No favourite hotels yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
            {favouriteHotels.map((hotel) => (
              <FavouriteHotelListCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FavouriteHotelPage;
