'use client'

import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaRegBuilding } from 'react-icons/fa'
import { LuCalendarDays } from 'react-icons/lu'
import { FiUserPlus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { BsChevronDoubleDown } from 'react-icons/bs'
import { Search, X } from 'lucide-react'
import { useAppDispatch } from '@/redux/hooks'
import { searchHotels, updateHotelSearchParams, resetHotelSearch } from '@/redux/HotelSlice/hotelSearchSlice'
import { resetHotelFilters } from '@/redux/HotelSlice/hotelFiltersSlice'
import type { HotelSearchParams } from '@/types/HotelSearchPageTypes'

const DESTINATION_SUGGESTIONS = [
  'Gothenburg', 'Stockholm', 'Copenhagen', 'Oslo', 'Helsinki',
  'Amsterdam', 'Berlin', 'Prague', 'Vienna', 'Zurich',
]

const HotelSearchBarInner = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const urlSearchParams = useSearchParams()
  const isSearchPage = pathname === '/hotel/search'

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false)
  const [showDestDropdown, setShowDestDropdown] = useState(false)

  const hasAutoSearched = useRef(false)

  useEffect(() => {
    if (!isSearchPage) {
      hasAutoSearched.current = false
      return
    }
    if (hasAutoSearched.current) return
    hasAutoSearched.current = true

    const urlDestination = urlSearchParams.get('destination') || ''
    const urlCheckIn = urlSearchParams.get('checkIn') || ''
    const urlCheckOut = urlSearchParams.get('checkOut') || ''
    const urlAdults = urlSearchParams.get('adults')
    const urlChildren = urlSearchParams.get('children')
    const urlRooms = urlSearchParams.get('rooms')

    const params: HotelSearchParams = {
      destination: urlDestination,
      checkIn: urlCheckIn,
      checkOut: urlCheckOut,
      adults: urlAdults ? Math.max(1, Number(urlAdults)) : 2,
      children: urlChildren ? Math.max(0, Number(urlChildren)) : 0,
      rooms: urlRooms ? Math.max(1, Number(urlRooms)) : 1,
    }

    setDestination(params.destination)
    setCheckIn(params.checkIn)
    setCheckOut(params.checkOut)
    setAdults(params.adults)
    setChildren(params.children)
    setRooms(params.rooms)

    dispatch(updateHotelSearchParams(params))
    dispatch(searchHotels(params))
  }, [isSearchPage, urlSearchParams, dispatch])

  const guestFields = [
    { label: 'Adults', value: adults, setter: setAdults, min: 1 },
    { label: 'Children', value: children, setter: setChildren, min: 0 },
    { label: 'Rooms', value: rooms, setter: setRooms, min: 1 },
  ]

  const filteredDestinations = DESTINATION_SUGGESTIONS.filter((d) =>
    d.toLowerCase().includes(destination.toLowerCase().trim())
  )

  function handleSearch() {
    const params: HotelSearchParams = {
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
    }

    dispatch(updateHotelSearchParams(params))

    if (!isSearchPage) {
      const query = new URLSearchParams()
      if (params.destination) query.set('destination', params.destination)
      if (params.checkIn) query.set('checkIn', params.checkIn)
      if (params.checkOut) query.set('checkOut', params.checkOut)
      query.set('adults', String(params.adults))
      query.set('children', String(params.children))
      query.set('rooms', String(params.rooms))
      router.push(`/hotel/search?${query.toString()}`)
      return
    }

    dispatch(searchHotels(params))
  }

  function handleClear() {
    setDestination('')
    setCheckIn('')
    setCheckOut('')
    setAdults(2)
    setChildren(0)
    setRooms(1)
    dispatch(resetHotelFilters())

    if (isSearchPage) {
      const params: HotelSearchParams = {
        destination: '',
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
        rooms: 1,
      }
      dispatch(updateHotelSearchParams(params))
      dispatch(searchHotels(params))
    } else {
      dispatch(resetHotelSearch())
    }
  }

  return (
    <div className="w-full py-2 sm:py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1">
          Where Is Your Next Dream Place?
        </h2>
        <p className="text-theme text-xs md:text-sm mb-6">
          Find Exclusive Genius Rewards In Every Corner Of The World!
        </p>

        <div className="hidden md:flex w-full mb-1">
          <div className="flex-2 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">Place</span>
          </div>
          <div className="flex-2 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">Passengers - Room Condition</span>
          </div>
          <div className="flex-2 min-w-0 px-1">
            <span className="text-xs font-bold text-primary">Check In / Check Out</span>
          </div>
          <div className="w-27.5 shrink-0" />
        </div>

        <div className="flex flex-col md:flex-row w-full rounded-sm shadow-md md:shadow-lg overflow-visible">
          {/* Place */}
          <div className="bg-white relative flex items-center gap-2.5 px-4 min-h-9 md:h-11 border border-border flex-2 min-w-0">
            <FaRegBuilding className="w-5 h-5 text-theme shrink-0" />
            <input
              type="text"
              placeholder="Where Are You Going To?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setShowDestDropdown(true)}
              onBlur={() => setTimeout(() => setShowDestDropdown(false), 150)}
              className="border-none outline-none text-[0.875rem] text-primary bg-transparent w-full min-w-0 placeholder:text-secondary"
            />
            {showDestDropdown && filteredDestinations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredDestinations.map((city) => (
                  <button
                    key={city}
                    onMouseDown={() => {
                      setDestination(city)
                      setShowDestDropdown(false)
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted text-foreground transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Passengers / Room */}
          <div
            className="bg-white relative flex items-center gap-2.5 px-4 min-h-9 md:h-11 border border-border border-t-0 md:border-t md:border-l-0 flex-2 min-w-0 cursor-pointer select-none"
            onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
          >
            <FiUserPlus className="w-5 h-5 text-theme shrink-0" />
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-hidden text-[0.875rem] text-primary whitespace-nowrap min-w-0">
              <span>{adults} Adults - {children} Children</span>
            </div>
            <span className="text-[0.875rem] text-primary whitespace-nowrap mr-1">{rooms} Rooms</span>
            <BsChevronDoubleDown className="w-4 h-4 text-theme shrink-0" />

            {guestDropdownOpen && (
              <div
                className="absolute top-[calc(100%+6px)] left-0 right-0 min-w-52 bg-white rounded-lg shadow-xl z-50 py-2 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                {guestFields.map(({ label, value, setter, min }, i) => (
                  <div
                    key={label}
                    className={`flex justify-between items-center py-2.5 ${i < guestFields.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-[0.875rem] text-primary font-semibold">{label}</span>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-7 h-7 rounded-full border border-theme text-theme flex items-center justify-center text-lg font-semibold hover:bg-theme hover:text-white transition-colors"
                        onClick={() => setter(Math.max(min, value - 1))}
                      >
                        −
                      </button>
                      <span className="text-[0.875rem] font-bold text-primary min-w-4 text-center">{value}</span>
                      <button
                        className="w-7 h-7 rounded-full border border-theme text-theme flex items-center justify-center text-lg font-semibold hover:bg-theme hover:text-white transition-colors"
                        onClick={() => setter(value + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Check In / Check Out */}
          <div className="bg-white flex items-center gap-2 px-4 min-h-9 md:h-11 border border-border border-t-0 md:border-t md:border-l-0 flex-2 min-w-0">
            <LuCalendarDays className="w-5 h-5 text-theme shrink-0" />
            <input
              type="text"
              placeholder="Check In"
              value={checkIn}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
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
              min={checkIn || today}
              className="border-none outline-none text-[0.875rem] text-primary bg-transparent flex-1 min-w-0 placeholder:text-secondary"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex w-full md:w-auto ">
            <Button
              onClick={handleSearch}
              className="bg-theme w-full md:w-none hover:bg-theme/90 text-white border border-theme font-bold text-[1rem] px-6 min-h-9 md:h-11 shrink-0 whitespace-nowrap rounded-none  flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
            
          </div>
          <div className="flex w-full md:w-auto ">
            <Button
              onClick={handleClear}
              variant="outline"
              className="border border-border w-full md:w-none font-bold text-[1rem] px-4 min-h-9 md:h-11 shrink-0 whitespace-nowrap rounded-none md:rounded-r-sm flex items-center gap-2 hover:bg-muted"
            >
              <X className="w-4 h-4" /> Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const HotelSearchBar = () => {
  return (
    <Suspense>
      <HotelSearchBarInner />
    </Suspense>
  )
}

export default HotelSearchBar
