'use client'

import React, { useState } from 'react'
import { FaAngleDown, FaRegBuilding } from 'react-icons/fa'
import { FiUserPlus } from 'react-icons/fi'
import { LuCalendarDays } from 'react-icons/lu'

const HomeHeroSection = () => {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(3)
  const [rooms, setRooms] = useState(1)
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false)

  const handleSearch = () => {
    console.log({ destination, checkIn, checkOut, adults, children, rooms })
  }

  const guestFields = [
    { label: 'Adults', value: adults, setter: setAdults },
    { label: 'Children', value: children, setter: setChildren },
    { label: 'Rooms', value: rooms, setter: setRooms },
  ]

  return (
    <>
      {/* Hero Section — does NOT overflow; search bar lives below via the wrapper */}
      <section className="relative w-full h-72 sm:h-80 md:h-96">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
          style={{ backgroundImage: "url('/HomePageImages/home-hero-banner.png')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Headline */}
        <div className="max-w-7xl mx-auto relative z-20 h-full flex items-end pb-20 md:pb-14 px-5 sm:px-7 md:px-12">
          <h1 className="text-white text-2xl sm:text-4xl md:text-[44px] font-extrabold leading-tight tracking-tight drop-shadow-md">
            Discover Your Trip<br />Worldwide !
          </h1>
        </div>
      </section>

      {/* Search Bar — sits BELOW the hero on mobile, overlaps on md+ */}
      <div className="relative z-30 w-full bg-transparent -mt-18 md:-mt-7  py-4 md:py-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 md:px-12">
          <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-sm shadow-md md:shadow-lg overflow-visible">

            {/* Destination */}
            <div className="flex items-center gap-2.5 px-4 min-h-9 md:h-14 rounded-t-sm md:rounded-r-none md:rounded-l-sm border border-border flex-1 min-w-0">
              <span className="shrink-0">
                <FaRegBuilding className="w-5 h-5 text-theme" />
              </span>
              <input
                type="text"
                placeholder="Where Are You Going To?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border-none outline-none text-[0.93rem] text-primary bg-transparent w-full min-w-0 placeholder:text-secondary"
              />
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2.5 px-4 min-h-9 md:h-14 border border-border flex-1 min-w-0">
              <span className="shrink-0">
                <LuCalendarDays className="w-5 h-5 text-theme" />
              </span>
              <div className="flex gap-2 flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Check In"
                  value={checkIn}
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border-none outline-none text-[0.93rem] text-primary bg-transparent flex-1 min-w-0 placeholder:text-secondary"
                />
                <input
                  type="text"
                  placeholder="Check Out"
                  value={checkOut}
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border-none outline-none text-[0.93rem] text-primary bg-transparent flex-1 min-w-0 placeholder:text-secondary"
                />
              </div>
            </div>

            {/* Guests */}
            <div
              className="relative flex items-center gap-2.5 px-4 min-h-9 md:h-14 border border-border flex-1 min-w-0 cursor-pointer select-none"
              onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
            >
              <span className="shrink-0">
                <FiUserPlus className="w-5 h-5 text-theme" />
              </span>
              <div className="flex gap-3 flex-1 flex-nowrap overflow-hidden">
                <span className="text-[0.93rem] text-primary whitespace-nowrap">Adults {adults}</span>
                <span className="text-[0.93rem] text-primary whitespace-nowrap">Children {children}</span>
                <span className="text-[0.93rem] text-primary whitespace-nowrap">Room {rooms}</span>
              </div>
              <span className="shrink-0">
                <FaAngleDown className="w-4 h-4 text-theme" />
              </span>

              {/* Guest Dropdown */}
              {guestDropdownOpen && (
                <div
                  className="absolute top-[calc(100%+8px)] left-0 right-0 min-w-50 bg-white rounded-lg shadow-xl z-50 py-2 px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {guestFields.map(({ label, value, setter }, i) => (
                    <div
                      key={label}
                      className={`flex justify-between items-center py-2.5 ${i < guestFields.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <span className="text-[0.93rem] text-primary font-medium">{label}</span>
                      <div className="flex items-center gap-3">
                        <button
                          className="w-7 h-7 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                          onClick={() => setter(Math.max(0, value - 1))}
                        >−</button>
                        <span className="text-[0.93rem] font-semibold text-primary min-w-4.5 text-center">{value}</span>
                        <button
                          className="w-7 h-7 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                          onClick={() => setter(value + 1)}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-theme hover:bg-theme/90 cursor-pointer text-white font-bold text-[1.05rem] px-9 min-h-9 md:h-14 shrink-0 whitespace-nowrap w-full md:w-auto rounded-b-sm md:rounded-l-none md:rounded-r-sm"
            >
              Search
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default HomeHeroSection