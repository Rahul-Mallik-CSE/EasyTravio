import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './FlightSlice/searchSlice'
import filtersReducer from './FlightSlice/filtersSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      filters: filtersReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
