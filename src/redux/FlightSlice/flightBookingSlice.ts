import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Flight } from '@/types/FlightAllTypes'

interface BookingFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  cardNumber: string
  cvc: string
  expDate: string
  paymentMethod: string
}

interface FlightBookingState {
  flight: Flight | null
  formData: BookingFormData | null
  bookingStartTime: number | null
  isConfirmed: boolean
  bookingId: string | null
}

const BOOKING_DURATION_MS = 2 * 60 * 1000

const initialState: FlightBookingState = {
  flight: null,
  formData: null,
  bookingStartTime: null,
  isConfirmed: false,
  bookingId: null,
}

const flightBookingSlice = createSlice({
  name: 'flightBooking',
  initialState,
  reducers: {
    startBookingSession(state, action: PayloadAction<Flight>) {
      state.flight = action.payload
      state.bookingStartTime = Date.now()
      state.isConfirmed = false
      state.formData = null
      state.bookingId = null
    },
    setBookingFormData(state, action: PayloadAction<BookingFormData>) {
      state.formData = action.payload
    },
    confirmBooking(state) {
      state.isConfirmed = true
      state.bookingId = `BK-${Date.now().toString(36).toUpperCase()}`
    },
    resetBookingSession() {
      return initialState
    },
  },
})

export const { startBookingSession, setBookingFormData, confirmBooking, resetBookingSession } =
  flightBookingSlice.actions

export const BOOKING_DURATION = BOOKING_DURATION_MS

export default flightBookingSlice.reducer
