import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FlightFilters, SortOption } from '@/types/FlightAllTypes'

interface FiltersState {
  filters: FlightFilters
  sortBy: SortOption
}

const initialState: FiltersState = {
  filters: {
    minPrice: null,
    maxPrice: null,
    maxStops: null,
    airlines: [],
    departureWindow: 'any',
  },
  sortBy: 'price-asc',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload
    },
    setMinPrice(state, action: PayloadAction<number | null>) {
      state.filters.minPrice = action.payload
    },
    setMaxPrice(state, action: PayloadAction<number | null>) {
      state.filters.maxPrice = action.payload
    },
    setMaxStops(state, action: PayloadAction<number | null>) {
      state.filters.maxStops = action.payload
    },
    toggleAirline(state, action: PayloadAction<string>) {
      const airline = action.payload
      const index = state.filters.airlines.indexOf(airline)
      if (index >= 0) {
        state.filters.airlines.splice(index, 1)
      } else {
        state.filters.airlines.push(airline)
      }
    },
    setDepartureWindow(state, action: PayloadAction<FlightFilters['departureWindow']>) {
      state.filters.departureWindow = action.payload
    },
    resetFilters(state) {
      state.filters = initialState.filters
      state.sortBy = initialState.sortBy
    },
  },
})

export const {
  setSortBy,
  setMinPrice,
  setMaxPrice,
  setMaxStops,
  toggleAirline,
  setDepartureWindow,
  resetFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
