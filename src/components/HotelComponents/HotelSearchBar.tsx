'use client'

import React, { useState } from 'react'
import { FaRegBuilding, FaStar } from 'react-icons/fa'
import { LuCalendarDays } from 'react-icons/lu'
import { FiUserPlus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { BsChevronDoubleDown } from 'react-icons/bs'


const HotelSearchBar = () => {
  const [destination, setDestination] = useState('')
  const [vip, setVip] = useState('Long Lasting')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(3)
  const [rooms, setRooms] = useState(2)
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false)

  const [vipDropdownOpen, setVipDropdownOpen] = useState(false)

  const vipOptions = ['Long Lasting', 'Premium', 'Standard', 'Basic']

  const guestFields = [
    { label: 'Adults', value: adults, setter: setAdults },
    { label: 'Children', value: children, setter: setChildren },
    { label: 'Rooms', value: rooms, setter: setRooms },
  ]

  const handleSearch = () => {
    console.log({ destination, vip, checkIn, checkOut, adults, children, rooms })
  }

  return (
    <div className="w-full py-2 sm:py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <h2 className="text-theme font-extrabold text-lg sm:text-xl md:text-2xl mb-1">
          Where Is Your Next Dream Place?
        </h2>
        <p className="text-theme text-xs md:text-sm mb-6">
          Find Exclusive Genius Rewards In Every Corner Of The World!
        </p>

        {/* Labels row — hidden on mobile */}
        <div className="hidden md:flex w-full mb-1">
          <div className="flex-2 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">Place</span>
          </div>
          <div className="flex-1 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">VIP</span>
          </div>
          <div className="flex-2 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">Passengers - Room Condition</span>
          </div>
          <div className="flex-2 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">Check In / Check Out</span>
          </div>
          {/* Spacer matching search button width */}
          <div className="w-27.5 shrink-0" />
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row w-full rounded-sm shadow-md md:shadow-lg overflow-visible">

          {/* Place */}
          <div className="bg-white flex items-center gap-2.5 px-4 min-h-9 md:h-14 border border-border flex-2 min-w-0">
            <FaRegBuilding className="w-5 h-5 text-theme shrink-0" />
            <input
              type="text"
              placeholder="Where Are You Going To?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-none outline-none text-[0.875rem] text-primary bg-transparent w-full min-w-0 placeholder:text-secondary"
            />
          </div>

          {/* VIP */}
          <div
            className="bg-white relative flex items-center gap-2.5 px-4 min-h-9 md:h-14 border border-border border-t-0 md:border-t md:border-l-0 flex-1 min-w-0 cursor-pointer"
            onClick={() => setVipDropdownOpen(!vipDropdownOpen)}
            >
            <FaStar className="w-4 h-4 text-theme shrink-0" />

            <span className="text-[0.875rem] text-primary flex-1">
                {vip}
            </span>

            <BsChevronDoubleDown className="w-4 h-4 text-theme shrink-0" />

            {/* VIP Dropdown */}
            {vipDropdownOpen && (
                <div
                className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-lg shadow-xl z-50 py-2"
                onClick={(e) => e.stopPropagation()}
                >
                {vipOptions.map((option) => (
                    <div
                    key={option}
                    onClick={() => {
                        setVip(option)
                        setVipDropdownOpen(false)
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        vip === option ? 'font-bold text-theme' : 'text-primary'
                    }`}
                    >
                    {option}
                    </div>
                ))}
                </div>
            )}
          </div>
          {/* Passengers / Room */}
          <div
            className="bg-white relative flex items-center gap-2.5 px-4 min-h-9 md:h-14 border border-border border-t-0 md:border-t md:border-l-0 flex-2 min-w-0 cursor-pointer select-none"
            onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
          >
            <FiUserPlus className="w-5 h-5 text-theme shrink-0" />
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-hidden text-[0.875rem] text-primary whitespace-nowrap min-w-0">
              <span>{adults} Adults - {children} Children</span>
            </div>
            <span className="text-[0.875rem] text-primary whitespace-nowrap mr-1">{rooms} Rooms</span>
            <BsChevronDoubleDown className="w-4 h-4 text-theme shrink-0" />

            {/* Guest Dropdown */}
            {guestDropdownOpen && (
              <div
                className="absolute top-[calc(100%+6px)] left-0 right-0 min-w-52 bg-white rounded-lg shadow-xl z-50 py-2 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                {guestFields.map(({ label, value, setter }, i) => (
                  <div
                    key={label}
                    className={`flex justify-between items-center py-2.5 ${i < guestFields.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-[0.875rem] text-primary font-semibold">{label}</span>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-7 h-7 rounded-full border border-theme text-theme flex items-center justify-center text-lg font-semibold hover:bg-theme hover:text-white transition-colors"
                        onClick={() => setter(Math.max(0, value - 1))}
                      >−</button>
                      <span className="text-[0.875rem] font-bold text-primary min-w-4 text-center">{value}</span>
                      <button
                        className="w-7 h-7 rounded-full border border-theme text-theme flex items-center justify-center text-lg font-semibold hover:bg-theme hover:text-white transition-colors"
                        onClick={() => setter(value + 1)}
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Check In / Check Out */}
          <div className="bg-white flex items-center gap-2 px-4 min-h-9 md:h-14 border border-border border-t-0 md:border-t md:border-l-0 flex-2 min-w-0">
            <LuCalendarDays className="w-5 h-5 text-theme shrink-0" />
            <input
              type="text"
              placeholder="Check In"
              value={checkIn}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border-none outline-none text-[0.875rem] text-primary bg-transparent flex-1 min-w-0 placeholder:text-secondary"
            />
            <span className="text-secondary text-sm shrink-0">-</span>
            <input
              type="text"
              placeholder="Check Out"
              value={checkOut}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border-none outline-none text-[0.875rem] text-primary bg-transparent flex-1 min-w-0 placeholder:text-secondary"
            />
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-theme hover:bg-theme/90 text-white border border-theme font-bold text-[1rem] px-8 min-h-9 md:h-14 shrink-0 whitespace-nowrap w-full md:w-auto rounded-none md:rounded-r-sm"
          >
            Search
          </Button>

        </div>
      </div>
    </div>
  )
}

export default HotelSearchBar