import type { RootState } from '@/redux/store'
import { HOTELS_PAGE_SIZE } from '@/lib/utils/pagination'
import type { HotelSearchItem, HotelSearchParams, HotelSearchMeta } from '@/types/HotelSearchPageTypes'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

interface HotelSearchState {
  params: HotelSearchParams
  hotels: HotelSearchItem[]
  meta: HotelSearchMeta | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  loadMoreStatus: 'idle' | 'loading' | 'failed'
  error: string | null
  loadMoreError: string | null
}

const initialState: HotelSearchState = {
  params: {
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
  },
  hotels: [],
  meta: null,
  status: 'idle',
  loadMoreStatus: 'idle',
  error: null,
  loadMoreError: null,
}

const buildSearchQuery = (params: HotelSearchParams, page: number) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(HOTELS_PAGE_SIZE),
    adults: String(params.adults),
    children: String(params.children),
    rooms: String(params.rooms),
  })
  if (params.destination) query.set('destination', params.destination)
  if (params.checkIn) query.set('checkIn', params.checkIn)
  if (params.checkOut) query.set('checkOut', params.checkOut)
  return query
}

const fetchHotelPage = async (params: HotelSearchParams, page: number) => {
  const response = await fetch(`/api/hotels?${buildSearchQuery(params, page)}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error ?? 'Search failed')
  }

  return {
    hotels: data.hotels as HotelSearchItem[],
    meta: data.meta as HotelSearchMeta,
    params,
  }
}

export const searchHotels = createAsyncThunk(
  'hotelSearch/searchHotels',
  async (params: HotelSearchParams, { rejectWithValue }) => {
    try {
      return await fetchHotelPage(params, 1)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Search failed')
    }
  }
)

export const loadMoreHotels = createAsyncThunk(
  'hotelSearch/loadMoreHotels',
  async (_, { getState, rejectWithValue }) => {
    const { hotelSearch } = getState() as RootState

    if (!hotelSearch.meta?.hasMore) {
      return rejectWithValue('No more hotels to load')
    }

    try {
      return await fetchHotelPage(hotelSearch.params, hotelSearch.meta.page + 1)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load more hotels')
    }
  }
)

const hotelSearchSlice = createSlice({
  name: 'hotelSearch',
  initialState,
  reducers: {
    updateHotelSearchParams(state, action: PayloadAction<Partial<HotelSearchParams>>) {
      state.params = { ...state.params, ...action.payload }
    },
    resetHotelSearch(state) {
      state.hotels = []
      state.meta = null
      state.status = 'idle'
      state.loadMoreStatus = 'idle'
      state.error = null
      state.loadMoreError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHotels.pending, (state) => {
        state.status = 'loading'
        state.loadMoreStatus = 'idle'
        state.error = null
        state.loadMoreError = null
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.hotels = action.payload.hotels
        state.meta = action.payload.meta
        state.params = action.payload.params
      })
      .addCase(searchHotels.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? 'Something went wrong'
        state.hotels = []
        state.meta = null
      })
      .addCase(loadMoreHotels.pending, (state) => {
        state.loadMoreStatus = 'loading'
        state.loadMoreError = null
      })
      .addCase(loadMoreHotels.fulfilled, (state, action) => {
        state.loadMoreStatus = 'idle'
        state.hotels = [...state.hotels, ...action.payload.hotels]
        state.meta = action.payload.meta
      })
      .addCase(loadMoreHotels.rejected, (state, action) => {
        state.loadMoreStatus = 'failed'
        state.loadMoreError = (action.payload as string) ?? 'Failed to load more hotels'
      })
  },
})

export const { updateHotelSearchParams, resetHotelSearch } = hotelSearchSlice.actions
export default hotelSearchSlice.reducer
