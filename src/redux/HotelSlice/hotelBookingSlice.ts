import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'

interface HotelBookingFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  cardNumber: string
  cvc: string
  expDate: string
  bookingForWork: boolean
  paymentMethod: string
}

interface HotelBookingState {
  hotel: HotelDetail | null
  formData: HotelBookingFormData | null
  bookingStartTime: number | null
  isConfirmed: boolean
  bookingId: string | null
}

const BOOKING_DURATION_MS = 15 * 60 * 1000

const initialState: HotelBookingState = {
  hotel: null,
  formData: null,
  bookingStartTime: null,
  isConfirmed: false,
  bookingId: null,
}

const hotelBookingSlice = createSlice({
  name: 'hotelBooking',
  initialState,
  reducers: {
    startHotelBookingSession(state, action: PayloadAction<HotelDetail>) {
      state.hotel = action.payload
      state.bookingStartTime = Date.now()
      state.isConfirmed = false
      state.formData = null
      state.bookingId = null
    },
    setHotelBookingFormData(state, action: PayloadAction<HotelBookingFormData>) {
      state.formData = action.payload
    },
    confirmHotelBooking(state) {
      state.isConfirmed = true
      state.bookingId = `HB-${Date.now().toString(36).toUpperCase()}`
    },
    resetHotelBookingSession() {
      return initialState
    },
  },
})

export const {
  startHotelBookingSession,
  setHotelBookingFormData,
  confirmHotelBooking,
  resetHotelBookingSession,
} = hotelBookingSlice.actions

export const HOTEL_BOOKING_DURATION = BOOKING_DURATION_MS

export default hotelBookingSlice.reducer
