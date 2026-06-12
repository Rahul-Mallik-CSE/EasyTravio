'use client'

import React, { useState } from 'react'
import { FaRegBuilding, FaAngleDown, FaStar } from 'react-icons/fa'
import { LuCalendarDays } from 'react-icons/lu'
import { FiUserPlus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'


const HotelSearchBar = () => {
  const [destination, setDestination] = useState('')
  const [vip, setVip] = useState('Long Lasting')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(3)
  const [rooms, setRooms] = useState(2)
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false)

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
            {/* Heading */}
            <h2 className="text-theme font-extrabold text-lg sm:text-xl md:text-2xl mb-1">
                Where Is Your Next Dream Place?
            </h2>
            <p className="text-theme text-xs md:text-sm mb-6">
                Find Exclusive Genius Rewards In Every Corner Of The World!
            </p>

            

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center  rounded-sm shadow-md md:shadow-lg overflow-visible">

                {/* Place */}
                <div >
                    <span  className="text-xs font-bold text-primary pb-1.5">
                    Place
                    </span>
                    <div className="bg-white flex items-center gap-2.5 px-4 min-h-13 md:h-14 border border-border flex-1 min-w-0 rounded-t-sm md:rounded-t-none md:rounded-l-sm">
                        <FaRegBuilding className="w-5 h-5 text-theme shrink-0" />
                        <input
                            type="text"
                            placeholder="Where Are You Going To?"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="border-none outline-none text-[0.875rem] text-primary bg-transparent w-full min-w-0 placeholder:text-secondary"
                        />
                    </div>
                </div>

                {/* VIP */}
                <div >
                    <span  className="text-xs font-bold text-primary pb-1.5">
                        VIP
                    </span>
                    <div className="bg-white flex items-center gap-2.5 px-4 min-h-13 md:h-14 border border-border flex-1 min-w-0">
                        <FaStar className="w-4 h-4 text-theme shrink-0" />
                        <select
                            value={vip}
                            onChange={(e) => setVip(e.target.value)}
                            className="border-none outline-none text-[0.875rem] text-primary bg-transparent flex-1 min-w-0 cursor-pointer appearance-none"
                        >
                            <option>Long Lasting</option>
                            <option>Premium</option>
                            <option>Standard</option>
                            <option>Basic</option>
                        </select>
                        <FaAngleDown className="w-4 h-4 text-theme shrink-0" />
                    </div>
                </div>

                {/* Passengers / Room */}
                <div >
                    <span  className="text-xs font-bold text-primary pb-1.5">
                    Passengers - Room Condition
                    </span>
                    <div
                    className="bg-white relative flex items-center gap-2.5 px-4 min-h-13 md:h-14 border border-border flex-1 min-w-0 cursor-pointer select-none"
                    onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                    >
                    <FiUserPlus className="w-5 h-5 text-theme shrink-0" />
                    <div className="flex gap-1.5 flex-1 flex-nowrap overflow-hidden text-[0.875rem] text-primary whitespace-nowrap">
                        <span>{adults} Adults - {children} Children</span>
                    </div>
                    <span className="text-[0.875rem] text-primary whitespace-nowrap mr-1">{rooms}</span>
                    <FaAngleDown className="w-4 h-4 text-theme shrink-0" />

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
                </div>

                {/* Check In / Check Out */}
                <div >
                    <span  className="text-xs font-bold text-primary pb-1.5">
                    Check In / Check Out
                    </span>
                    <div className="bg-white flex items-center gap-2 px-4 min-h-13 md:h-14 border border-border flex-1 min-w-0">
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
                    <span className="text-secondary text-sm">-</span>
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
                </div>

                {/* Search Button */}
                <Button
                onClick={handleSearch}
                className="bg-theme hover:bg-theme/90 md:mt-6 text-white border border-theme font-bold text-[1rem] px-9 min-h-13 md:h-14 shrink-0 whitespace-nowrap w-full md:w-auto rounded-b-sm md:rounded-l-none md:rounded-r-sm rounded-t-none md:rounded-t-none"
                >
                Search
                </Button>

            </div>
        </div>
    </div>
  )
}

export default HotelSearchBar