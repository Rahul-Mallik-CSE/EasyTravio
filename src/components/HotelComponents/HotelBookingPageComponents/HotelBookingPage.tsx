'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, Clock, AlertTriangle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchHotelDetail, resetHotelDetail } from '@/redux/HotelSlice/hotelDetailSlice'
import {
  startHotelBookingSession,
  resetHotelBookingSession,
  HOTEL_BOOKING_DURATION,
} from '@/redux/HotelSlice/hotelBookingSlice'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import HotelSummaryCard from './SubComponents/HotelSummaryCard'
import HotelTripSummary from './SubComponents/HotelTripSummary'
import HotelBookingForm from './SubComponents/HotelBookingForm'

interface HotelBookingPageProps {
  hotelId: string
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`
}

export default function HotelBookingPage({ hotelId }: HotelBookingPageProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { hotel, status, error } = useAppSelector((state) => state.hotelDetail)
  const { bookingStartTime, isConfirmed } = useAppSelector((state) => state.hotelBooking)

  const [timeLeft, setTimeLeft] = useState<number>(HOTEL_BOOKING_DURATION / 1000)
  const [sessionStarted, setSessionStarted] = useState(false)

  useEffect(() => {
    dispatch(fetchHotelDetail(hotelId))
    return () => {
      dispatch(resetHotelDetail())
    }
  }, [hotelId, dispatch])

  useEffect(() => {
    if (hotel && !sessionStarted) {
      dispatch(startHotelBookingSession(hotel))
      setSessionStarted(true)
    }
  }, [hotel, sessionStarted, dispatch])

  const handleExpire = useCallback(() => {
    dispatch(resetHotelBookingSession())
    router.push('/hotel/search')
  }, [dispatch, router])

  useEffect(() => {
    if (!bookingStartTime || isConfirmed) return

    const tick = () => {
      const elapsed = Date.now() - bookingStartTime
      const remaining = Math.max(0, Math.ceil((HOTEL_BOOKING_DURATION - elapsed) / 1000))
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
      router.push(`/hotel/${hotelId}/confirmation`)
    }
  }, [isConfirmed, hotelId, router])

  if (status === 'loading' || status === 'idle') {
    return (
      <main className="w-full min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StateDisplay icon={Building2} loading title="Loading hotel details…" subtitle="Please wait" />
        </div>
      </main>
    )
  }

  if (status === 'failed' || !hotel) {
    return (
      <main className="w-full min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StateDisplay icon={Building2} title={error || 'Hotel not found'} subtitle="The hotel you are looking for does not exist." />
        </div>
      </main>
    )
  }

  const isUrgent = timeLeft <= 60

  return (
    <main className="w-full min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-secondary text-sm hover:text-theme transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hotel
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

        {/* Urgent warning */}
        {isUrgent && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-700">
              Session will expire soon. After that, you&apos;ll need to redo the search.
            </p>
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Info panel */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Hotel Details
            </h1>
            <p className="text-sm text-secondary mb-6">
              {hotel.name} · {hotel.location}, {hotel.city}
            </p>

            <HotelSummaryCard hotel={hotel} />
            <HotelTripSummary hotel={hotel} />
          </div>

          {/* RIGHT: Payment form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Payment Methods And Information
            </h2>
            <HotelBookingForm hotel={hotel} />
          </div>
        </div>
      </div>
    </main>
  )
}
