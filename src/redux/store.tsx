import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './FlightSlice/searchSlice'
import filtersReducer from './FlightSlice/filtersSlice'
import flightDetailReducer from './FlightSlice/flightDetailSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      filters: filtersReducer,
      flightDetail: flightDetailReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
