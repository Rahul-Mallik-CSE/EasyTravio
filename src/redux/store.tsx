import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './FlightSlice/searchSlice'
import filtersReducer from './FlightSlice/filtersSlice'
import flightDetailReducer from './FlightSlice/flightDetailSlice'
import flightBookingReducer from './FlightSlice/flightBookingSlice'
import hotelSearchReducer from './HotelSlice/hotelSearchSlice'
import hotelFiltersReducer from './HotelSlice/hotelFiltersSlice'
import hotelDetailReducer from './HotelSlice/hotelDetailSlice'
import hotelBookingReducer from './HotelSlice/hotelBookingSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      filters: filtersReducer,
      flightDetail: flightDetailReducer,
      flightBooking: flightBookingReducer,
      hotelSearch: hotelSearchReducer,
      hotelFilters: hotelFiltersReducer,
      hotelDetail: hotelDetailReducer,
      hotelBooking: hotelBookingReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
