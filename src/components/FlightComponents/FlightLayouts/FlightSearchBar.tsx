'use client'
import { useState, useRef, useMemo, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeftRight,
  Users,
  Calendar,
  ChevronDown,
  PlaneTakeoff,
  PlaneLanding,
  Search,
  X,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { searchFlights, updateSearchParams, resetSearch } from '@/redux/FlightSlice/searchSlice'
import { resetFilters } from '@/redux/FlightSlice/filtersSlice'
import { AIRPORTS } from '@/lib/mock/flightGenerator'
import type { SearchParams } from '@/types/FlightAllTypes'

const ALL_CITIES = AIRPORTS.map((a) => `${a.city} (${a.code})`).sort()
const DEFAULT_ORIGIN = `${AIRPORTS[0].city} (${AIRPORTS[0].code})`
const DEFAULT_DESTINATION = `${AIRPORTS[1].city} (${AIRPORTS[1].code})`
const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First Class']

export default function FlightSearchBar() {
  const dispatch = useAppDispatch()
  const searchParams = useAppSelector((state) => state.search.params)
  const pathname = usePathname()
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const isSearchPage = pathname === '/flight/search'

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const maxDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 365)
    return d.toISOString().split('T')[0]
  }, [])

  const [origin, setOrigin] = useState(searchParams.origin || DEFAULT_ORIGIN)
  const [destination, setDestination] = useState(searchParams.destination || DEFAULT_DESTINATION)
  const [departDate, setDepartDate] = useState(searchParams.date || today)
  const [passengers, setPassengers] = useState({ adults: searchParams.passengers || 1, children: 0, infants: 0 })
  const [cabinClass, setCabinClass] = useState('')
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false)
  const [showOriginDropdown, setShowOriginDropdown] = useState(false)
  const [showDestDropdown, setShowDestDropdown] = useState(false)
  const [departDateFocused, setDepartDateFocused] = useState(false)
  const passengerRef = useRef<HTMLDivElement>(null)

  // Filter dropdowns to exclude the selected counterpart
  const originOptions = useMemo(() => {
    const destCode = destination.split('(')[1]?.replace(')', '').trim()
    return ALL_CITIES.filter((c) => {
      const code = c.split('(')[1]?.replace(')', '').trim()
      return code !== destCode
    })
  }, [destination])

  const destOptions = useMemo(() => {
    const originCode = origin.split('(')[1]?.replace(')', '').trim()
    return ALL_CITIES.filter((c) => {
      const code = c.split('(')[1]?.replace(')', '').trim()
      return code !== originCode
    })
  }, [origin])

  // Auto-search on mount when on search page (reload or direct navigation)
  useEffect(() => {
    if (!isSearchPage) return

    const urlOrigin = urlSearchParams.get('origin')
    const urlDest = urlSearchParams.get('destination')
    const urlDate = urlSearchParams.get('date')
    const urlPassengers = urlSearchParams.get('passengers')

    if (urlOrigin && urlDest && urlDate) {
      const params: SearchParams = {
        origin: urlOrigin.toUpperCase(),
        destination: urlDest.toUpperCase(),
        date: urlDate,
        passengers: urlPassengers ? Math.max(1, Number(urlPassengers)) : 1,
      }
      setOrigin(`${AIRPORTS.find((a) => a.code === params.origin)?.city ?? params.origin} (${params.origin})`)
      setDestination(`${AIRPORTS.find((a) => a.code === params.destination)?.city ?? params.destination} (${params.destination})`)
      setDepartDate(params.date)
      setPassengers({ adults: params.passengers, children: 0, infants: 0 })
      dispatch(updateSearchParams(params))
      dispatch(searchFlights(params))
    } else {
      // No URL params — auto-search with defaults (today's date)
      const defaultOriginCode = AIRPORTS[0].code
      const defaultDestCode = AIRPORTS[1].code
      const params: SearchParams = {
        origin: defaultOriginCode,
        destination: defaultDestCode,
        date: today,
        passengers: 1,
      }
      dispatch(updateSearchParams(params))
      dispatch(searchFlights(params))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const totalPassengers = passengers.adults + passengers.children + passengers.infants
  const selectedPassengerLabel =
    totalPassengers > 0
      ? `${passengers.adults} Adult${passengers.adults !== 1 ? 's' : ''}${passengers.children > 0 ? `, ${passengers.children} Child${passengers.children !== 1 ? 'ren' : ''}` : ''}${passengers.infants > 0 ? `, ${passengers.infants} Infant${passengers.infants !== 1 ? 's' : ''}` : ''}`
      : 'Select passengers'
  const selectedCabinLabel = cabinClass || 'Select cabin class'

  function swapLocations() {
    const temp = origin
    setOrigin(destination)
    setDestination(temp)
  }

  function handleSearch() {
    const total = totalPassengers > 0 ? totalPassengers : 1
    const params: SearchParams = {
      origin: origin.split('(')[1]?.replace(')', '').trim() || origin,
      destination: destination.split('(')[1]?.replace(')', '').trim() || destination,
      date: departDate,
      passengers: total,
    }
    dispatch(updateSearchParams(params))

    if (!isSearchPage) {
      const query = new URLSearchParams({
        origin: params.origin,
        destination: params.destination,
        date: params.date,
        passengers: String(params.passengers),
      })
      router.push(`/flight/search?${query.toString()}`)
      return
    }

    dispatch(searchFlights(params))
  }

  function handleClearSearch() {
    const todayStr = new Date().toISOString().split('T')[0]
    setOrigin(DEFAULT_ORIGIN)
    setDestination(DEFAULT_DESTINATION)
    setDepartDate(todayStr)
    setPassengers({ adults: 1, children: 0, infants: 0 })
    setCabinClass('')
    setTripType('one-way')
    setShowPassengerDropdown(false)
    setShowOriginDropdown(false)
    setShowDestDropdown(false)
    dispatch(resetFilters())

    if (isSearchPage) {
      const params: SearchParams = {
        origin: AIRPORTS[0].code,
        destination: AIRPORTS[1].code,
        date: todayStr,
        passengers: 1,
      }
      dispatch(updateSearchParams(params))
      dispatch(searchFlights(params))
    } else {
      dispatch(resetSearch())
    }
  }

  function adjustPassenger(type: 'adults' | 'children' | 'infants', delta: number) {
    setPassengers((prev) => {
      const newVal = Math.max(0, prev[type] + delta)
      if (type === 'adults' && newVal < 1) return prev
      return { ...prev, [type]: newVal }
    })
  }

  return (
    <div className="w-full mb-2 md:mb-4 lg:mb-6">
      {/* Hero heading */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          Which Exciting Place Is Your Next Adventure Taking You?
        </h1>
        <p className="text-sm text-theme mt-1">Discover Exclusive Genius Rewards Wherever Your Journey Takes You!</p>
      </div>

      {/* Search card */}
      <div className="">
        {/* Trip type toggle */}
        <div className="flex items-center gap-2 mb-4">
          {(['one-way', 'round-trip'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                tripType === type
                  ? 'bg-theme text-white border-theme'
                  : 'bg-white text-secondary border-border hover:border-theme hover:text-theme'
              }`}
            >
              {type === 'one-way' ? 'One Way' : 'Round Trip'}
            </button>
          ))}
        </div>

        {/* Main search row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-3 items-end">
          {/* From */}
          <div className="relative">
            <label className="block text-xs text-secondary font-medium mb-1">From</label>
            <div className="relative">
              <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onFocus={() => setShowOriginDropdown(true)}
                onBlur={() => setTimeout(() => setShowOriginDropdown(false), 150)}
                placeholder="Select place"
                className="w-full pl-9 pr-3 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme focus:border-theme"
              />
              {showOriginDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden max-h-64 overflow-y-auto">
                  {originOptions.filter((c) =>
                    c.toLowerCase().includes(origin.toLowerCase().trim())
                  ).map((city) => (
                    <button
                      key={city}
                      onMouseDown={() => {
                        setOrigin(city)
                        setShowOriginDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted text-foreground transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center items-end pb-0.5">
            <button
              onClick={swapLocations}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-theme text-theme hover:bg-theme hover:text-white transition-colors cursor-pointer"
              aria-label="Swap origin and destination"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="relative">
            <label className="block text-xs text-secondary font-medium mb-1">To</label>
            <div className="relative">
              <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setShowDestDropdown(true)}
                onBlur={() => setTimeout(() => setShowDestDropdown(false), 150)}
                placeholder="Select place"
                className="w-full pl-9 pr-3 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme focus:border-theme"
              />
              {showDestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden max-h-64 overflow-y-auto">
                  {destOptions.filter((c) =>
                    c.toLowerCase().includes(destination.toLowerCase().trim())
                  ).map((city) => (
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
          </div>

          {/* Passengers + Class */}
          <div className="relative" ref={passengerRef}>
            <label className="block text-xs text-secondary font-medium mb-1">Passengers · Class</label>
            <button
              onClick={() => setShowPassengerDropdown((p) => !p)}
              className="w-full flex items-center justify-between pl-3 pr-2 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background hover:border-theme focus:outline-none focus:ring-1 focus:ring-theme cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Users className="w-4 h-4 text-theme shrink-0" />
                <span className="truncate text-xs">{selectedPassengerLabel} · {selectedCabinLabel}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-secondary shrink-0" />
            </button>

            {showPassengerDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-xl z-50 p-4 min-w-72">
                {(
                  [
                    { label: 'Adults', sub: 'Age 12+', key: 'adults' as const },
                    { label: 'Children', sub: 'Age 2–11', key: 'children' as const },
                    { label: 'Infants', sub: 'Under 2', key: 'infants' as const },
                  ]
                ).map(({ label, sub, key }) => (
                  <div key={key} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-secondary">{sub}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => adjustPassenger(key, -1)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-lg font-medium text-foreground hover:border-theme hover:text-theme cursor-pointer transition-colors"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm font-semibold">{passengers[key]}</span>
                      <button
                        onClick={() => adjustPassenger(key, 1)}
                        className="w-8 h-8 rounded-full border border-theme bg-theme text-white flex items-center justify-center text-lg font-medium hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-3">
                  <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Cabin Class</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CABIN_CLASSES.map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setCabinClass(cls)}
                        className={`py-2 px-3 rounded-sm border text-xs font-medium cursor-pointer transition-colors ${
                          cabinClass === cls
                            ? 'bg-theme text-white border-theme'
                            : 'border-border text-foreground hover:border-theme hover:text-theme'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowPassengerDropdown(false)}
                  className="mt-3 w-full py-2 bg-theme text-white rounded-sm text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Dates */}
          <div>
            <label className="block text-xs text-secondary font-medium mb-1">
              {tripType === 'round-trip' ? 'Departure · Return' : 'Departure Date'}
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme" />
                <input
                  type={departDateFocused || Boolean(departDate) ? 'date' : 'text'}
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  onFocus={() => setDepartDateFocused(true)}
                  onBlur={() => {
                    if (!departDate) setDepartDateFocused(false)
                  }}
                  min={today}
                  max={maxDate}
                  placeholder="Select date"
                  aria-label="Select departure date"
                  className="w-full pl-9 pr-2 py-2.5 border border-border rounded-sm text-sm text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-theme focus:border-theme"
                />
              </div>
            </div>
          </div>

          {/* Search button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 bg-theme text-white px-6 py-2.5 rounded-sm font-semibold text-sm hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Find Flights
            </button>
            <button
              onClick={handleClearSearch}
              className="flex items-center justify-center gap-2 border border-border bg-white text-secondary px-5 py-2.5 rounded-sm font-semibold text-sm hover:border-theme hover:text-theme transition-colors cursor-pointer whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
