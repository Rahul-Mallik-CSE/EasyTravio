'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Plane, ArrowLeft, Download, Mail } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { resetBookingSession } from '@/redux/FlightSlice/flightBookingSlice'

const ConfirmationPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { flight, formData, bookingId, isConfirmed } = useAppSelector(
    (state) => state.flightBooking
  )

  useEffect(() => {
    if (!isConfirmed || !flight) {
      router.push('/flight/search')
    }
  }, [isConfirmed, flight, router])

  useEffect(() => {
    return () => {
      dispatch(resetBookingSession())
    }
  }, [dispatch])

  if (!isConfirmed || !flight || !formData) return null

  const maskedCard = `•••• •••• •••• ${formData.cardNumber.replace(/\s/g, '').slice(-4)}`

  return (
    <main className="w-full min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-secondary">
            Your flight has been successfully booked. A confirmation email has been sent to{' '}
            <span className="font-semibold text-foreground">{formData.email}</span>.
          </p>
        </div>

        {/* Booking ID */}
        <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary font-medium uppercase tracking-wide">Booking Reference</p>
              <p className="text-2xl font-bold text-theme font-mono tracking-wider mt-1">{bookingId}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-secondary border border-border rounded-sm hover:bg-accent transition-colors cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-secondary border border-border rounded-sm hover:bg-accent transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
                Email
              </button>
            </div>
          </div>
        </div>

        {/* Flight Info */}
        <div className="bg-card border border-card-border rounded-lg overflow-hidden mb-6">
          <div className="bg-theme px-4 py-2.5 flex items-center gap-2">
            <Plane className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-semibold">Flight Details</span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-bold text-foreground">{flight.originCity}</p>
                <p className="text-xs text-secondary">{flight.origin}</p>
              </div>
              <div className="flex-1 mx-4 border-t border-dashed border-border" />
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{flight.destinationCity}</p>
                <p className="text-xs text-secondary">{flight.destination}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center border-t border-card-border pt-4">
              <div>
                <p className="text-xs text-secondary">Airline</p>
                <p className="text-sm font-semibold text-foreground">{flight.airline}</p>
              </div>
              <div>
                <p className="text-xs text-secondary">Flight</p>
                <p className="text-sm font-semibold text-foreground">{flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-xs text-secondary">Duration</p>
                <p className="text-sm font-semibold text-foreground">{flight.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger & Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-card-border rounded-lg p-4">
            <p className="text-xs text-secondary font-medium uppercase tracking-wide mb-2">Passenger</p>
            <p className="text-sm font-bold text-foreground">{formData.firstName} {formData.lastName}</p>
            <p className="text-xs text-secondary mt-1">{formData.phone}</p>
            <p className="text-xs text-secondary">{formData.email}</p>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-4">
            <p className="text-xs text-secondary font-medium uppercase tracking-wide mb-2">Payment</p>
            <p className="text-sm font-bold text-foreground capitalize">{formData.paymentMethod}</p>
            <p className="text-xs text-secondary mt-1 font-mono">{maskedCard}</p>
            <p className="text-xs text-secondary">Exp: {formData.expDate}</p>
          </div>
        </div>

        {/* Price */}
        <div className="bg-card border border-card-border rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Total Paid</span>
            <span className="text-2xl font-bold text-theme">${flight.price}</span>
          </div>
        </div>

        {/* Back to search */}
        <button
          onClick={() => router.push('/flight/search')}
          className="w-full flex items-center justify-center gap-2 bg-theme text-white py-3 rounded-sm font-bold text-sm hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Search More Flights
        </button>
      </div>
    </main>
  )
}

export default ConfirmationPage
