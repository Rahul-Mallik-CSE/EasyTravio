'use client'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'
import { useAppDispatch } from '@/redux/hooks'
import { setHotelBookingFormData, confirmHotelBooking } from '@/redux/HotelSlice/hotelBookingSlice'
import BookingForm, { type BookingFormData } from '@/components/CommonComponents/BookingForm'

interface HotelBookingFormProps {
  hotel: HotelDetail
}

function PriceDetailsInline({ hotel }: { hotel: HotelDetail }) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-4 mb-6">
      <p className="font-bold text-foreground mb-3">Price Details</p>
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <span className="text-theme font-bold">${hotel.pricePerNight}</span>
        <span className="text-secondary">Per Night</span>
      </div>
      <div className="border-t border-card-border mt-3 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          Total ({hotel.nights} Night{hotel.nights > 1 ? 's' : ''})
        </span>
        <span className="text-xl font-bold text-theme">${hotel.pricePerNight * hotel.nights}</span>
      </div>
    </div>
  )
}

export default function HotelBookingForm({ hotel }: HotelBookingFormProps) {
  const dispatch = useAppDispatch()

  const handleSubmit = async (formData: BookingFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    dispatch(
      setHotelBookingFormData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        cardNumber: formData.cardNumber,
        cvc: formData.cvc,
        expDate: formData.expDate,
        bookingForWork: formData.bookingForWork,
        paymentMethod: formData.paymentMethod,
      })
    )
    dispatch(confirmHotelBooking())
  }

  return (
    <BookingForm
      priceSection={<PriceDetailsInline hotel={hotel} />}
      onSubmit={handleSubmit}
    />
  )
}
