import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { HotelFilters, HotelSortOption } from '@/types/HotelSearchPageTypes'

interface HotelFiltersState {
  filters: HotelFilters
  sortBy: HotelSortOption
}

const initialState: HotelFiltersState = {
  filters: {
    minPrice: null,
    maxPrice: null,
    breakfastIncluded: false,
    allInclusive: false,
    freeCancellation: false,
    pool: false,
    petFriendly: false,
    ownBathroom: false,
    kitchen: false,
    seaView: false,
    babyBed: false,
    bathtub: false,
    guestRating: 'all',
    bedType: 'all',
    sauna: false,
    fitnessCentre: false,
    bar: false,
    steamBath: false,
    yoga: false,
    sustainabilityLevel: 'any',
    stars: 'any',
    distance: 'any',
  },
  sortBy: 'price-asc',
}

const hotelFiltersSlice = createSlice({
  name: 'hotelFilters',
  initialState,
  reducers: {
    setHotelSortBy(state, action: PayloadAction<HotelSortOption>) {
      state.sortBy = action.payload
    },
    setHotelMinPrice(state, action: PayloadAction<number | null>) {
      state.filters.minPrice = action.payload
    },
    setHotelMaxPrice(state, action: PayloadAction<number | null>) {
      state.filters.maxPrice = action.payload
    },
    setHotelFilter(state, action: PayloadAction<{ key: keyof HotelFilters; value: unknown }>) {
      const { key, value } = action.payload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(state.filters as any)[key] = value
    },
    resetHotelFilters(state) {
      state.filters = initialState.filters
      state.sortBy = initialSortBy
    },
  },
})

const initialSortBy = initialState.sortBy

export const {
  setHotelSortBy,
  setHotelMinPrice,
  setHotelMaxPrice,
  setHotelFilter,
  resetHotelFilters,
} = hotelFiltersSlice.actions
export default hotelFiltersSlice.reducer
