'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plane, Clock, AlertTriangle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchFlightDetail, resetFlightDetail } from '@/redux/FlightSlice/flightDetailSlice'
import {
  startBookingSession,
  resetBookingSession,
  BOOKING_DURATION,
} from '@/redux/FlightSlice/flightBookingSlice'
import type { FlightDetail } from '@/types/FlightDetailTypes'
import type { Flight } from '@/types/FlightAllTypes'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import FlightSummaryCard from './FlightSummaryCard'
import TripSummary from './TripSummary'
import FlightReviews from './FlightReviews'
import BookingForm from './BookingForm'

function detailToFlight(d: FlightDetail): Flight {
  return {
    id: d.id,
    airline: d.airline,
    flightNumber: d.flightNumber,
    origin: d.departureAirport.code,
    originCity: d.departureAirport.city,
    destination: d.arrivalAirport.code,
    destinationCity: d.arrivalAirport.city,
    departureTime: d.depart,
    arrivalTime: d.arrive,
    duration: parseDuration(d.duration),
    stops: d.stops,
    stopCities: d.stopCity ? d.stopCity.split(',').map((s) => s.trim()) : [],
    price: d.price,
    currency: 'USD',
    cabinClass: 'economy',
    availableSeats: 0,
  }
}

function parseDuration(dur: string): number {
  const match = dur.match(/(\d+)h\s*(\d+)?m?/)
  if (!match) return parseInt(dur, 10) || 0
  return (parseInt(match[1], 10) || 0) * 60 + (parseInt(match[2] || '0', 10) || 0)
}

interface FlightBookingPageProps {
  flightId: string
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`
}

export default function FlightBookingPage({ flightId }: FlightBookingPageProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { flight, status, error } = useAppSelector((state) => state.flightDetail)
  const { bookingStartTime, isConfirmed } = useAppSelector((state) => state.flightBooking)

  const [timeLeft, setTimeLeft] = useState<number>(BOOKING_DURATION / 1000)
  const [sessionStarted, setSessionStarted] = useState(false)

  useEffect(() => {
    dispatch(fetchFlightDetail(flightId))
    return () => {
      dispatch(resetFlightDetail())
    }
  }, [flightId, dispatch])

  useEffect(() => {
    if (flight && !sessionStarted) {
      dispatch(startBookingSession(detailToFlight(flight)))
      setSessionStarted(true)
    }
  }, [flight, sessionStarted, dispatch])

  const handleExpire = useCallback(() => {
    dispatch(resetBookingSession())
    router.push('/flight/search')
  }, [dispatch, router])

  useEffect(() => {
    if (!bookingStartTime || isConfirmed) return

    const tick = () => {
      const elapsed = Date.now() - bookingStartTime
      const remaining = Math.max(0, Math.ceil((BOOKING_DURATION - elapsed) / 1000))
      setTimeLeft(remaining)

      if (remaining <= 0) {
        handleExpire()
      }
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [bookingStartTime, isConfirmed, handleExpire])

  useEffect(() => {
    if (isConfirmed) {
      router.push(`/flight/${flightId}/confirmation`)
    }
  }, [isConfirmed, flightId, router])

  if (status === 'loading') {
    return (
      <main className="w-full min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StateDisplay icon={Plane} loading title="Loading flight details…" subtitle="Please wait" />
        </div>
      </main>
    )
  }

  if (status === 'failed' || !flight) {
    return (
      <main className="w-full min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StateDisplay icon={Plane} title={error || 'Flight not found'} subtitle="The flight you are looking for does not exist." />
        </div>
      </main>
    )
  }

  const isUrgent = timeLeft <= 30
  const flightData = detailToFlight(flight)

  return (
    <main className="w-full min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-secondary text-sm hover:text-theme transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Flights
          </button>

          {/* Timer */}
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-lg border transition-colors ${
              isUrgent
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            {isUrgent ? (
              <AlertTriangle className="w-4 h-4 animate-pulse" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            <div className="flex flex-col items-end leading-tight">
              <span className="text-lg font-bold font-mono tracking-wider tabular-nums">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[10px] font-medium">
                {isUrgent ? 'Session expiring soon!' : 'Session expires in'}
              </span>
            </div>
          </div>
        </div>

        {isUrgent && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-700">
              Session will expire soon. After that, you&apos;ll need to redo the search.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Info panel */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Flight Details
            </h1>
            <p className="text-sm text-secondary mb-6">
              {flightData.originCity} to {flightData.destinationCity} · {flightData.airline}
            </p>

            <FlightSummaryCard flight={flightData} />
            <TripSummary flight={flightData} />
            <FlightReviews />
          </div>

          {/* RIGHT: Payment form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Payment Methods And Information
            </h2>
            <BookingForm flight={flightData} />
          </div>
        </div>
      </div>
    </main>
  )
}
