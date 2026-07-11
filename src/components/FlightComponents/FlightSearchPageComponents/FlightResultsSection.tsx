import React from 'react'
import { Heart } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import FlightFilterSidebar from './FlightFilterSidebar'
import FlightSortBar from './FlightSortBar'
import FlightCard from './FlightCard'

const DEMO_FLIGHTS = [
  {
    airline: 'Emirates',
    fromCity: 'Dubai',
    departTime: '08:30',
    departCode: 'DXB',
    departName: 'Dubai Intl',
    toCity: 'London',
    arriveTime: '01:15',
    arriveCode: 'LHR',
    arriveName: 'Heathrow',
    duration: '7h 45m',
    stops: 0,
    price: 450,
    vacantSeats: 23,
    co2: '182 kg CO₂',
    bag: '23kg Checked',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=400&h=300&fit=crop',
  },
  {
    airline: 'Qatar Airways',
    fromCity: 'Doha',
    departTime: '10:00',
    departCode: 'DOH',
    departName: 'Hamad Intl',
    toCity: 'Paris',
    arriveTime: '03:30',
    arriveCode: 'CDG',
    arriveName: 'Charles de Gaulle',
    duration: '7h 30m',
    stops: 0,
    price: 385,
    vacantSeats: 8,
    co2: '174 kg CO₂',
    bag: '30kg Checked',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&h=300&fit=crop',
  },
  {
    airline: 'Singapore Airlines',
    fromCity: 'Singapore',
    departTime: '11:45',
    departCode: 'SIN',
    departName: 'Changi',
    toCity: 'Tokyo',
    arriveTime: '07:20',
    arriveCode: 'NRT',
    arriveName: 'Narita Intl',
    duration: '6h 35m',
    stops: 0,
    price: 520,
    vacantSeats: 5,
    co2: '156 kg CO₂',
    bag: '25kg Checked',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  },
  {
    airline: 'Lufthansa',
    fromCity: 'Frankfurt',
    departTime: '06:15',
    departCode: 'FRA',
    departName: 'Frankfurt Intl',
    toCity: 'New York',
    arriveTime: '09:00',
    arriveCode: 'JFK',
    arriveName: 'John F. Kennedy',
    duration: '8h 45m',
    stops: 1,
    stopCity: 'Munich',
    price: 410,
    vacantSeats: 15,
    co2: '210 kg CO₂',
    bag: '23kg Checked',
    imageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bad6e?w=400&h=300&fit=crop',
  },
]

export default function FlightResultsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      {/* Mobile filter toggle */}
      <div className="flex md:hidden items-center justify-between mb-4">
        <p className="text-sm text-secondary">
          <span className="font-semibold text-foreground">{DEMO_FLIGHTS.length}</span> flights found
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 border border-theme text-theme rounded-sm px-3 py-2 text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer">
              Filters
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto p-5">
            <p className="text-base font-bold mb-4">Filters</p>
            <FlightFilterSidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Filter sidebar — desktop only */}
        <aside className="hidden md:block w-44 lg:w-52 shrink-0">
          <div className="sticky top-4 max-h-full overflow-y-auto pr-2">
            <FlightFilterSidebar />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <FlightSortBar resultCount={DEMO_FLIGHTS.length} />

          <div className="flex flex-col gap-4">
            {DEMO_FLIGHTS.map((flight, index) => (
              <FlightCard key={index} {...flight} />
            ))}
          </div>

          {/* Bottom action row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button className="flex items-center gap-2 border border-theme text-theme px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-blue-50 transition-colors cursor-pointer">
              <Heart className="w-4 h-4" />
              List Your Favourite Places
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
