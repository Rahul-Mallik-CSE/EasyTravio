import type { CabinClass, Flight, Airport } from '@/types/FlightAllTypes'

export const AIRPORTS: Airport[] = [
  { code: 'DAC', city: 'Dhaka', name: 'Hazrat Shahjalal Intl' },
  { code: 'CGP', city: 'Chittagong', name: 'Shah Amanat Intl' },
  { code: 'CXB', city: "Cox's Bazar", name: "Cox's Bazar Intl" },
  { code: 'ZYL', city: 'Sylhet', name: 'Osmani Intl' },
  { code: 'RJH', city: 'Rajshahi', name: 'Shah Makhdum Intl' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'KL Intl' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai Intl' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi' },
]

export const MOCK_FLIGHT_COUNT = 500

const AIRLINES = [
  { name: 'Biman Bangladesh', code: 'BG' },
  { name: 'Emirates', code: 'EK' },
  { name: 'Qatar Airways', code: 'QR' },
  { name: 'Singapore Airlines', code: 'SQ' },
  { name: 'AirAsia', code: 'AK' },
  { name: 'Turkish Airlines', code: 'TK' },
] as const

const CABIN_CLASSES: CabinClass[] = ['economy', 'premium', 'business']
const SEAT_OPTIONS = [6, 8, 12, 18, 24, 30]
const STOP_OPTIONS = [0, 0, 0, 1, 1, 2] as const
const CANONICAL_DATE = '2026-07-15'

const airportCity = Object.fromEntries(AIRPORTS.map((a) => [a.code, a.city]))

const hashString = (value: string) => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const routeKey = (origin: string, destination: string, date: string) => `${origin}-${destination}-${date}`

const estimateDuration = (origin: string, destination: string) => {
  const seed = hashString(`${origin}-${destination}`)
  return 60 + (seed % 360)
}

const pickStopCities = (origin: string, destination: string, stops: number, seed: number) => {
  if (stops === 0) return [] as string[]
  const hubs = AIRPORTS.map((a) => a.code).filter((code) => code !== origin && code !== destination)
  const cities: string[] = []
  for (let i = 0; i < stops; i++) {
    cities.push(hubs[(seed + i * 3) % hubs.length])
  }
  return cities
}

export const buildFlightId = (origin: string, destination: string, date: string, index: number) =>
  `flt-${origin}-${destination}-${date.replace(/-/g, '')}-${String(index).padStart(2, '0')}`

export const parseFlightId = (id: string) => {
  const match = id.match(/^flt-([A-Z]{3})-([A-Z]{3})-(\d{8})-(\d{2})$/)
  if (!match) return null
  const [, origin, destination, compactDate, index] = match
  const date = `${compactDate.slice(0, 4)}-${compactDate.slice(4, 6)}-${compactDate.slice(6, 8)}`
  return { origin, destination, date, index: Number(index) }
}

const shiftIsoDate = (iso: string, fromDate: string, toDate: string) => {
  const time = iso.slice(fromDate.length)
  return `${toDate}${time}`
}

const isFlightScheduledOnDate = (flight: Flight, date: string): boolean => {
  if (date === CANONICAL_DATE) return true
  const parsed = parseFlightId(flight.id)
  if (!parsed) return false
  const seed = hashString(`${parsed.origin}-${parsed.destination}-${date}-${parsed.index}`)
  return seed % 3 !== 0
}

export const applySearchDate = (flight: Flight, date: string): Flight => {
  const parsed = parseFlightId(flight.id)
  const index = parsed?.index ?? 0
  return {
    ...flight,
    id: buildFlightId(flight.origin, flight.destination, date, index),
    departureTime: shiftIsoDate(flight.departureTime, CANONICAL_DATE, date),
    arrivalTime: shiftIsoDate(flight.arrivalTime, CANONICAL_DATE, date),
  }
}

const createTemplateFlight = (origin: string, destination: string, index: number, routeSeed: number): Flight => {
  const seed = routeSeed + index
  const airline = AIRLINES[(seed + index) % AIRLINES.length]
  const stops = STOP_OPTIONS[(seed + index) % STOP_OPTIONS.length]
  const stopCities = pickStopCities(origin, destination, stops, seed + index)
  const layoverMinutes = stops * (30 + ((seed + index) % 40))
  const duration = estimateDuration(origin, destination) + layoverMinutes
  const departureHour = 5 + ((seed + index * 2) % 17)
  const departureMinute = (seed + index * 13) % 60
  const departure = new Date(`${CANONICAL_DATE}T00:00:00.000Z`)
  departure.setUTCHours(departureHour, departureMinute, 0, 0)
  const arrival = new Date(departure.getTime() + duration * 60_000)
  const cabinClass = CABIN_CLASSES[(seed + index) % CABIN_CLASSES.length]
  const priceBase =
    120 + (seed % 100) + index * 20 + stops * 30 + (cabinClass === 'business' ? 100 : cabinClass === 'premium' ? 50 : 0)

  return {
    id: buildFlightId(origin, destination, CANONICAL_DATE, index),
    airline: airline.name,
    flightNumber: `${airline.code}${1000 + ((seed + index * 17) % 9000)}`,
    origin,
    originCity: airportCity[origin] ?? origin,
    destination,
    destinationCity: airportCity[destination] ?? destination,
    departureTime: departure.toISOString(),
    arrivalTime: arrival.toISOString(),
    duration,
    stops,
    stopCities,
    price: priceBase,
    currency: 'USD',
    cabinClass,
    availableSeats: SEAT_OPTIONS[(seed + index) % SEAT_OPTIONS.length],
  }
}

export const buildMockFlightCatalog = (count = MOCK_FLIGHT_COUNT): Flight[] => {
  const routes = AIRPORTS.flatMap((origin) =>
    AIRPORTS.filter((destination) => destination.code !== origin.code).map((destination) => ({
      origin: origin.code,
      destination: destination.code,
    }))
  )

  const basePerRoute = Math.floor(count / routes.length)
  let remainder = count % routes.length
  const flights: Flight[] = []

  for (const [routeIndex, route] of routes.entries()) {
    const flightsForRoute = basePerRoute + (remainder > 0 ? 1 : 0)
    if (remainder > 0) remainder -= 1
    const routeSeed = hashString(`${route.origin}-${route.destination}-${routeIndex}`)
    for (let index = 0; index < flightsForRoute; index++) {
      flights.push(createTemplateFlight(route.origin, route.destination, index, routeSeed))
    }
  }

  return flights.slice(0, count)
}

let catalogCache: Flight[] | null = null

export const resetMockFlightCatalogCache = () => {
  catalogCache = null
}

export const getMockFlightCatalog = () => {
  catalogCache ??= buildMockFlightCatalog()
  return catalogCache
}

export const generateFlightsForSearch = (origin: string, destination: string, date: string): Flight[] => {
  if (origin === destination) return []
  return getMockFlightCatalog()
    .filter((flight) => flight.origin === origin && flight.destination === destination)
    .filter((flight) => isFlightScheduledOnDate(flight, date))
    .map((flight) => applySearchDate(flight, date))
}

export const findFlightById = (id: string): Flight | undefined => {
  const parsed = parseFlightId(id)
  if (!parsed) return undefined
  const template = getMockFlightCatalog().find((flight) => {
    const templateParts = parseFlightId(flight.id)
    return (
      templateParts?.origin === parsed.origin &&
      templateParts.destination === parsed.destination &&
      templateParts.index === parsed.index
    )
  })
  if (!template) return undefined
  return applySearchDate(template, parsed.date)
}

export const generateAllMockFlights = () => getMockFlightCatalog()
