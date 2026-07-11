'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMinPrice, setMaxPrice, setMaxStops, toggleAirline, setDepartureWindow } from '@/redux/FlightSlice/filtersSlice'
import type { FlightFilters } from '@/types/FlightAllTypes'
import DualRangeSlider from '@/components/CommonComponents/DualRangeSlider'


const STOPS_OPTIONS = [
  { label: 'Non-stop', value: 0 },
  { label: '1 Stop', value: 1 },
  { label: '2+ Stops', value: 2 },
]

const RATING_OPTIONS = [
  { label: 'Outstanding (9+)', value: 'outstanding' },
  { label: 'Excellent (8.5+)', value: 'excellent' },
  { label: 'Very Good (8+)', value: 'veryGood' },
  { label: 'Good (7+)', value: 'good' },
  { label: 'Any', value: 'any' },
]

const DEPARTURE_WINDOWS: { label: string; value: FlightFilters['departureWindow'] }[] = [
  { label: 'Any Time', value: 'any' },
  { label: 'Early Morning (12AM–5AM)', value: 'early-morning' },
  { label: 'Morning (5AM–12PM)', value: 'morning' },
  { label: 'Afternoon (12PM–6PM)', value: 'afternoon' },
  { label: 'Evening (6PM–12AM)', value: 'evening' },
]

interface FlightFilterSidebarProps {
  availableAirlines?: string[]
  priceRange?: { min: number; max: number }
}

export default function FlightFilterSidebar({ availableAirlines = [], priceRange = { min: 0, max: 2000 } }: FlightFilterSidebarProps) {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters.filters)

  const currentMinPrice = filters.minPrice ?? priceRange.min
  const currentMaxPrice = filters.maxPrice ?? priceRange.max
  const maxStops = filters.maxStops ?? 2

  return (
    <div className="w-full text-sm min-w-0">
      {/* Price Range */}
      <DualRangeSlider
        label="Price Range"
        min={priceRange.min}
        max={priceRange.max}
        valueMin={currentMinPrice}
        valueMax={currentMaxPrice}
        onChangeMin={(v) => dispatch(setMinPrice(v))}
        onChangeMax={(v) => dispatch(setMaxPrice(v))}
        formatValue={(v) => `$${v}`}
      />

      {/* Stops */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Stops</p>
        <div className="space-y-2">
          {STOPS_OPTIONS.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={maxStops >= value}
                onChange={() => dispatch(setMaxStops(maxStops === value ? null : value))}
                className="w-3.5 h-3.5 rounded border-border text-theme accent-theme cursor-pointer"
              />
              <span className="text-xs text-foreground group-hover:text-theme transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Airline</p>
        <div className="space-y-2">
          {availableAirlines.map((airline) => (
            <label key={airline} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => dispatch(toggleAirline(airline))}
                className="w-3.5 h-3.5 rounded border-border text-theme accent-theme cursor-pointer"
              />
              <span className="text-xs text-foreground group-hover:text-theme transition-colors">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Departure Window */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Departure Time</p>
        <div className="space-y-2">
          {DEPARTURE_WINDOWS.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="departureWindow"
                value={value}
                checked={filters.departureWindow === value}
                onChange={() => dispatch(setDepartureWindow(value))}
                className="w-3.5 h-3.5 border-border text-theme accent-theme cursor-pointer"
              />
              <span className="text-xs text-foreground group-hover:text-theme transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Passenger Rating */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Passenger Rating</p>
        <div className="space-y-2">
          {RATING_OPTIONS.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="passengerRating"
                value={value}
                defaultChecked={value === 'any'}
                className="w-3.5 h-3.5 border-border text-theme accent-theme cursor-pointer"
              />
              <span className="text-xs text-foreground group-hover:text-theme transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
