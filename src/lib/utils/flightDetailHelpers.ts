import type { Flight } from '@/types/FlightAllTypes'
import type { FlightDetail } from '@/types/FlightDetailTypes'
import { formatDuration, formatTime } from '@/lib/utils/flightHelpers'
import { AIRLINE_IMAGES, DEFAULT_IMAGE } from '@/data/FlightLandingPageData'

const GATE_LETTERS = ['A', 'B', 'C', 'D', 'E']
const GATE_NUMBERS = 12

const hashString = (value: string): number => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const deterministicGate = (seed: string): string => {
  const h = hashString(seed)
  const letter = GATE_LETTERS[h % GATE_LETTERS.length]
  const number = (h % GATE_NUMBERS) + 1
  return `${letter}${number}`
}

const deterministicTerminal = (seed: string): string => {
  const h = hashString(seed)
  return `T${(h % 4) + 1}`
}

const deterministicBaggage = (cabinClass: string): string => {
  switch (cabinClass) {
    case 'business':
      return '40kg Checked'
    case 'premium':
      return '30kg Checked'
    default:
      return '23kg Checked'
  }
}

const deterministicRating = (price: number): number => {
  const base = 3.5 + ((price % 15) / 10)
  return Math.min(5, Math.round(base * 10) / 10)
}

const deterministicReviewCount = (id: string): number => {
  const h = hashString(id)
  return 200 + (h % 1800)
}

export const enrichFlightToDetail = (flight: Flight): FlightDetail => {
  const stopCity = flight.stopCities.length > 0 ? flight.stopCities[0] : undefined
  const imageUrl = AIRLINE_IMAGES[flight.airline] || DEFAULT_IMAGE
  const depart = formatTime(flight.departureTime)
  const arrive = formatTime(flight.arrivalTime)
  const duration = formatDuration(flight.duration)

  return {
    id: flight.id,
    airline: flight.airline,
    flightNumber: flight.flightNumber,
    departureAirport: {
      code: flight.origin,
      city: flight.originCity,
      gate: deterministicGate(`${flight.id}-dep`),
      terminal: deterministicTerminal(`${flight.id}-dep`),
    },
    arrivalAirport: {
      code: flight.destination,
      city: flight.destinationCity,
      gate: deterministicGate(`${flight.id}-arr`),
      terminal: deterministicTerminal(`${flight.id}-arr`),
    },
    depart,
    arrive,
    duration,
    stops: flight.stops,
    stopCity,
    imageUrl,
    price: flight.price,
    baggageWeight: deterministicBaggage(flight.cabinClass),
    petAllowed: flight.cabinClass !== 'economy',
    rating: deterministicRating(flight.price),
    reviewCount: deterministicReviewCount(flight.id),
  }
}

export const getStopsLabelDetail = (stops: number, stopCity?: string): string => {
  if (stops === 0) return 'Nonstop'
  if (stops === 1) return `1 Stop · ${stopCity || 'Connecting'}`
  return `${stops} Stops · ${stopCity || 'Connecting'}`
}

export const getRouteCode = (seed: string, min: number, max: number): number => {
  const h = hashString(seed)
  return min + (h % (max - min + 1))
}
