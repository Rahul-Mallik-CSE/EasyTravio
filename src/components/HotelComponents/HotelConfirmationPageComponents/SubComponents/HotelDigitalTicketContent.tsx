'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, CheckCircle, MapPin, Star, Calendar, Users, Bed, Moon } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { resetHotelBookingSession } from '@/redux/HotelSlice/hotelBookingSlice'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import HotelTicketBanner from './HotelTicketBanner'
import HotelTicketActions from './HotelTicketActions'
import HotelTicketTerms from './HotelTicketTerms'

const BED_LABELS: Record<string, string> = {
  twoSingle: 'Two Single Beds',
  king: 'King Bed',
  babyCots: 'Baby Cots',
  double: 'Double Bed',
  single: 'Single Bed',
}

export default function HotelDigitalTicketContent() {
  const [mounted, setMounted] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { hotel: bookingHotel, formData, bookingId, isConfirmed } = useAppSelector(
    (state) => state.hotelBooking
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StateDisplay icon={Building2} loading title="Loading your ticket…" subtitle="Please wait" />
        </div>
      </main>
    )
  }

  if (!isConfirmed || !bookingHotel || !formData) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StateDisplay
            icon={Building2}
            title="No booking found"
            subtitle="You haven't completed a hotel booking yet."
          />
          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/hotel/search')}
              className="text-theme text-sm font-semibold hover:underline cursor-pointer"
            >
              Browse Hotels
            </button>
          </div>
        </div>
      </main>
    )
  }

  const bookingRef = bookingId || 'HB-000000'
  const passengerName = `${formData.firstName} ${formData.lastName}`
  const email = formData.email
  const totalPrice = bookingHotel.pricePerNight * bookingHotel.nights

  async function createTicketPdfUrl() {
    if (!bookingHotel) return ''

    const [{ pdf }, { default: HotelTicketPdfDocument }] = await Promise.all([
      import('@react-pdf/renderer'),
      import('./Pdf/HotelTicketPdfDocument'),
    ])

    const blob = await pdf(
      <HotelTicketPdfDocument
        hotel={bookingHotel}
        passengerName={passengerName}
        bookingRef={bookingRef}
        email={email}
        totalPrice={totalPrice}
      />
    ).toBlob()

    return URL.createObjectURL(blob)
  }

  async function handleDownloadPdf() {
    const pdfUrl = await createTicketPdfUrl()
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `easytravio-hotel-${bookingRef}.pdf`
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 1500)
  }

  async function handlePrintPdf() {
    const pdfUrl = await createTicketPdfUrl()
    const pdfWindow = window.open(pdfUrl, '_blank')

    if (!pdfWindow) {
      URL.revokeObjectURL(pdfUrl)
      return
    }

    window.setTimeout(() => {
      pdfWindow.focus()
      pdfWindow.print()
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 2000)
    }, 700)
  }

  function handleSearchMore() {
    dispatch(resetHotelBookingSession())
    router.push('/hotel/search')
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HotelTicketBanner bookingRef={bookingRef} email={email} onPrint={handlePrintPdf} onDownload={handleDownloadPdf} />

        {/* Ticket Card */}
        <div className="bg-card border border-card-border rounded-lg shadow-sm mb-8" id="print-ticket">
          {/* Header */}
          <div className="px-6 pt-5 pb-3 border-b border-card-border">
            <h1 className="text-xl font-bold text-foreground">Hotel Booking Confirmation</h1>
            <p className="text-xs text-secondary mt-0.5">Your reservation has been confirmed</p>
          </div>

          {/* Passenger + Booking Info Bar */}
          <div className="px-6 py-2 bg-muted/50 border-b border-card-border flex items-center gap-6 flex-wrap text-xs text-secondary">
            <span>Guest: <strong className="text-foreground">{passengerName}</strong></span>
            <span>Booking Ref: <strong className="text-foreground font-mono tracking-widest">{bookingRef}</strong></span>
            <span>Hotel: <strong className="text-foreground">{bookingHotel.name}</strong></span>
            <span>Location: <strong className="text-foreground">{bookingHotel.city}</strong></span>
          </div>

          {/* Hotel Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Hotel Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{bookingHotel.name}</p>
                    <div className="flex items-center gap-1 text-secondary text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{bookingHotel.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{bookingHotel.ratingLabel}</p>
                    <p className="text-secondary text-xs">{bookingHotel.starRating} Star Hotel · {bookingHotel.reviewCount.toLocaleString()} Reviews</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Check-in / Check-out</p>
                    <p className="text-secondary text-xs">{bookingHotel.checkInTime} / {bookingHotel.checkOutTime}</p>
                  </div>
                </div>
              </div>

              {/* Right: Room Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{bookingHotel.adults} Adults, {bookingHotel.children} Children</p>
                    <p className="text-secondary text-xs">Guest Configuration</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center">
                    <Bed className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{bookingHotel.roomType}</p>
                    <p className="text-secondary text-xs">{BED_LABELS[bookingHotel.bedType] || bookingHotel.bedType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme/10 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{bookingHotel.nights} Night{bookingHotel.nights > 1 ? 's' : ''} Stay</p>
                    <p className="text-secondary text-xs">${bookingHotel.pricePerNight}/night · Total: ${totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Badge */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-green-800">Booking Confirmed</p>
                <p className="text-sm text-green-700">
                  A confirmation email has been sent to <span className="font-semibold">{email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <HotelTicketTerms />
        <HotelTicketActions onPrint={handlePrintPdf} onDownload={handleDownloadPdf} onSearchMore={handleSearchMore} />
      </div>
    </div>
  )
}
