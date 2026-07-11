export interface AirportDetail {
  code: string
  city: string
  gate: string
  terminal: string
}

export interface FlightDetail {
  id: string
  airline: string
  flightNumber: string
  secondFlightNumber?: string
  secondAirline?: string
  departureAirport: AirportDetail
  arrivalAirport: AirportDetail
  depart: string
  arrive: string
  duration: string
  stops: number
  stopCity?: string
  imageUrl: string
  price: number
  baggageWeight: string
  petAllowed: boolean
  rating: number
  reviewCount: number
}
