'use client'

import { useEffect, useState } from 'react'
import { Plane } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { resetBookingSession } from '@/redux/FlightSlice/flightBookingSlice'
import type { Flight as TicketFlight } from '@/types/FlightTypes'
import type { Flight as BookingFlight } from '@/types/FlightAllTypes'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import TicketActions from './TicketActions'
import TicketBanner from './TicketBanner'
import TicketCardHeader from './TicketCardHeader'
import TicketNotFoundState from './TicketNotFoundState'
import TicketRowsTable from './TicketRowsTable'
import TicketTerms from './TicketTerms'
import { buildTicketRows } from './ticketShared'

function bookingFlightToTicketFlight(flight: BookingFlight): TicketFlight {
  const [depH, depM] = (flight.departureTime || '12:00').split(':').map(Number)
  const [arrH, arrM] = (flight.arrivalTime || '12:00').split(':').map(Number)
  const depart = `${String(depH).padStart(2, '0')}:${String(depM).padStart(2, '0')}`
  const arrive = `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`
  const h = Math.floor(flight.duration / 60)
  const m = flight.duration % 60
  const duration = m > 0 ? `${h}h ${m}m` : `${h}h`
  const today = new Date().toISOString().split('T')[0]

  return {
    id: flight.id,
    airline: flight.airline,
    flightNumber: flight.flightNumber,
    departureAirport: {
      code: flight.origin,
      city: flight.originCity,
      name: `${flight.originCity} International Airport`,
    },
    arrivalAirport: {
      code: flight.destination,
      city: flight.destinationCity,
      name: `${flight.destinationCity} International Airport`,
    },
    depart,
    arrive,
    duration,
    stops: flight.stops,
    stopCity: flight.stopCities.length > 0 ? flight.stopCities[0] : undefined,
    cabin: 'Economy',
    date: today,
    price: flight.price,
  }
}

export default function DigitalTicketContent() {
  const [mounted, setMounted] = useState(false)
  const dispatch = useAppDispatch()
  const { flight: bookingFlight, formData, bookingId, isConfirmed } = useAppSelector(
    (state) => state.flightBooking
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StateDisplay icon={Plane} loading title="Loading your ticket…" subtitle="Please wait" />
        </div>
      </main>
    )
  }

  if (!isConfirmed || !bookingFlight || !formData) return <TicketNotFoundState />

  const ticketFlight = bookingFlightToTicketFlight(bookingFlight)
  const passengerName = `${formData.firstName} ${formData.lastName}`
  const email = formData.email
  const bookingRef = bookingId || 'BK-000000'

  const rows = buildTicketRows(ticketFlight)
  const hasStop = ticketFlight.stops > 0

  async function handleDownloadPdf() {
    window.print()
  }

  async function handlePrintPdf() {
    window.print()
  }

  function handleSearchMore() {
    dispatch(resetBookingSession())
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TicketBanner bookingRef={bookingRef} email={email} onPrint={handlePrintPdf} onDownload={handleDownloadPdf} />

        <div className="bg-card border border-card-border rounded-lg shadow-sm mb-8" id="print-ticket">
          <TicketCardHeader passengerName={passengerName} bookingRef={bookingRef} flight={ticketFlight} />
          <TicketRowsTable
            rows={rows}
            flightId={ticketFlight.id}
            bookingRef={bookingRef}
            passengerName={passengerName}
            hasStop={hasStop}
          />
        </div>

        <TicketTerms />

        <TicketActions onPrint={handlePrintPdf} onDownload={handleDownloadPdf} onSearchMore={handleSearchMore} />
      </div>
    </div>
  )
}
