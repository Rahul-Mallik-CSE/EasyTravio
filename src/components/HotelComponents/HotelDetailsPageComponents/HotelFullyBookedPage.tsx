'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'

interface HotelFullyBookedPageProps {
  hotel: HotelDetail
}

const HotelFullyBookedPage: React.FC<HotelFullyBookedPageProps> = ({ hotel }) => {
  const [showModal, setShowModal] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const router = useRouter()

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-red-600 mb-2">
                Our Hotel Is Currently Fully Booked !
              </h2>
              <p className="text-primary font-semibold text-sm md:text-base">
                We Apologize For The Inconvenience .
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6" />

            {/* Content */}
            <div className="text-center">
              <p className="text-primary font-bold text-sm md:text-base mb-1">
                Thank You For Your Understanding!
              </p>
              <p className="text-secondary text-xs md:text-sm mb-6">
                Checking Back With Us In A Few Days As Our Availability Can Change Quickly
              </p>

              {!subscribed ? (
                <>
                  <p className="text-primary text-xs md:text-sm mb-1">
                    Subscribe For Receiving Room Availability Notification
                  </p>
                  <p className="text-secondary text-xs mb-4">
                    During Your Time Expectations.
                  </p>

                  <div className="flex gap-2 mb-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme"
                    />
                  </div>

                  <Button
                    onClick={handleSubscribe}
                    className="w-full bg-theme hover:bg-theme/90 text-white font-bold py-3 rounded-md text-sm md:text-base"
                  >
                    Room Availability Notification
                  </Button>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-green-700 font-semibold text-sm">
                    Thank you! We&apos;ll notify you when a room becomes available.
                  </p>
                </div>
              )}
            </div>

            {/* Back to search */}
            <div className="text-center mt-6">
              <button
                onClick={() => router.push('/hotel/search')}
                className="text-theme text-sm font-semibold hover:underline cursor-pointer"
              >
                Browse Other Hotels
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background overlay text when modal is closed */}
      {!showModal && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            {hotel.name}
          </h1>
          <p className="text-white/90 text-lg mb-6 drop-shadow-md">
            This hotel is currently fully booked
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-theme hover:bg-theme/90 text-white font-bold px-8 py-3 rounded-md"
          >
            View Availability Status
          </Button>
          <button
            onClick={() => router.push('/hotel/search')}
            className="mt-4 text-white underline text-sm hover:text-white/80 cursor-pointer"
          >
            Browse Other Hotels
          </button>
        </div>
      )}
    </div>
  )
}

export default HotelFullyBookedPage
