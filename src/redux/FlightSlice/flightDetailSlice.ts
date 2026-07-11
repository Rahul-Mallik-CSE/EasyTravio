import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Flight } from '@/types/FlightAllTypes'
import type { FlightDetail } from '@/types/FlightDetailTypes'
import { findFlightById } from '@/lib/mock/flightGenerator'
import { enrichFlightToDetail } from '@/lib/utils/flightDetailHelpers'

interface FlightDetailState {
  flight: FlightDetail | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: FlightDetailState = {
  flight: null,
  status: 'idle',
  error: null,
}

export const fetchFlightDetail = createAsyncThunk<FlightDetail, string>(
  'flightDetail/fetchFlightDetail',
  async (flightId, { rejectWithValue }) => {
    try {
      const flight: Flight | undefined = findFlightById(flightId)
      if (!flight) {
        return rejectWithValue('Flight not found')
      }
      return enrichFlightToDetail(flight)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load flight details')
    }
  }
)

const flightDetailSlice = createSlice({
  name: 'flightDetail',
  initialState,
  reducers: {
    resetFlightDetail() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightDetail.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFlightDetail.fulfilled, (state, action: PayloadAction<FlightDetail>) => {
        state.status = 'succeeded'
        state.flight = action.payload
      })
      .addCase(fetchFlightDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? 'Something went wrong'
        state.flight = null
      })
  },
})

export const { resetFlightDetail } = flightDetailSlice.actions
export default flightDetailSlice.reducer
