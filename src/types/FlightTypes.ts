export interface AirportInfo {
  code: string
  city: string
  name: string
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  secondFlightNumber?: string
  secondAirline?: string
  departureAirport: AirportInfo
  arrivalAirport: AirportInfo
  depart: string
  arrive: string
  duration: string
  stops: number
  stopCity?: string
  cabin: string
  date: string
  price: number
}

export interface TicketRowLeg {
  type: 'leg'
  airline: string
  flightNumber: string
  cabin: string
  fromCode: string
  fromCity: string
  fromCountry: string
  fromAirport: string
  fromTime: string
  fromDate: string
  toCode: string
  toCity: string
  toCountry: string
  toAirport: string
  toTime: string
  toDate: string
  duration: string
}

export interface TicketRowStop {
  type: 'stop'
  stopCity: string
  stopAirport: string
  layover: string
}

export type TicketRow = TicketRowLeg | TicketRowStop
