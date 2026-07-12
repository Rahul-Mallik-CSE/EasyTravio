import type { HotelDetail } from '@/types/HotelSearchPageTypes'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

interface HotelDetailState {
  hotel: HotelDetail | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: HotelDetailState = {
  hotel: null,
  status: 'idle',
  error: null,
}

export const fetchHotelDetail = createAsyncThunk(
  'hotelDetail/fetchHotelDetail',
  async (hotelId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/hotels/${hotelId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to load hotel')
      }

      return data.hotel as HotelDetail
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load hotel')
    }
  }
)

const hotelDetailSlice = createSlice({
  name: 'hotelDetail',
  initialState,
  reducers: {
    resetHotelDetail(state) {
      state.hotel = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelDetail.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchHotelDetail.fulfilled, (state, action: PayloadAction<HotelDetail>) => {
        state.status = 'succeeded'
        state.hotel = action.payload
      })
      .addCase(fetchHotelDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? 'Failed to load hotel'
        state.hotel = null
      })
  },
})

export const { resetHotelDetail } = hotelDetailSlice.actions
export default hotelDetailSlice.reducer
