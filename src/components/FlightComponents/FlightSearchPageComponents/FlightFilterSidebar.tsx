'use client'
import React, { useRef, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMaxPrice, setMaxStops, toggleAirline, setDepartureWindow } from '@/redux/FlightSlice/filtersSlice'
import type { FlightFilters } from '@/types/FlightAllTypes'

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const period = h < 12 ? 'AM' : 'PM'
  const displayH = h % 12 || 12
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

function DualRangeSlider({
  label,
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  formatValue,
}: {
  label: string
  min: number
  max: number
  valueMin: number
  valueMax: number
  onChangeMin: (v: number) => void
  onChangeMax: (v: number) => void
  formatValue: (v: number) => string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const valueMinRef = useRef(valueMin)
  const valueMaxRef = useRef(valueMax)
  useEffect(() => { valueMinRef.current = valueMin }, [valueMin])
  useEffect(() => { valueMaxRef.current = valueMax }, [valueMax])

  const pctMin = ((valueMin - min) / (max - min)) * 100
  const pctMax = ((valueMax - min) / (max - min)) * 100

  const pxToValue = useCallback((clientX: number): number => {
    if (!trackRef.current) return min
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(min + ratio * (max - min))
  }, [min, max])

  const handleMinMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const onMove = (ev: MouseEvent) => {
      const next = Math.max(min, Math.min(pxToValue(ev.clientX), valueMaxRef.current - 1))
      onChangeMin(next)
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [min, onChangeMin, pxToValue])

  const handleMaxMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const onMove = (ev: MouseEvent) => {
      const next = Math.min(max, Math.max(pxToValue(ev.clientX), valueMinRef.current + 1))
      onChangeMax(next)
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [max, onChangeMax, pxToValue])

  const handleMinTouchStart = useCallback((e: React.TouchEvent) => {
    const onMove = (ev: TouchEvent) => {
      const next = Math.max(min, Math.min(pxToValue(ev.touches[0].clientX), valueMaxRef.current - 1))
      onChangeMin(next)
    }
    const onEnd = () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }, [min, onChangeMin, pxToValue])

  const handleMaxTouchStart = useCallback((e: React.TouchEvent) => {
    const onMove = (ev: TouchEvent) => {
      const next = Math.min(max, Math.max(pxToValue(ev.touches[0].clientX), valueMinRef.current + 1))
      onChangeMax(next)
    }
    const onEnd = () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }, [max, onChangeMax, pxToValue])

  return (
    <div className="mb-5">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      <div className="relative h-5 flex items-center" ref={trackRef}>
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-theme pointer-events-none"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <div
          role="slider"
          aria-label="Minimum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueMin}
          tabIndex={0}
          className="absolute w-4 h-4 rounded-full bg-theme border-2 border-white shadow-md cursor-grab active:cursor-grabbing select-none"
          style={{ left: `calc(${pctMin}% - 8px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          onMouseDown={handleMinMouseDown}
          onTouchStart={handleMinTouchStart}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') onChangeMin(Math.max(valueMin - 30, min))
            if (e.key === 'ArrowRight') onChangeMin(Math.min(valueMin + 30, valueMax - 1))
          }}
        />
        <div
          role="slider"
          aria-label="Maximum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueMax}
          tabIndex={0}
          className="absolute w-4 h-4 rounded-full bg-theme border-2 border-white shadow-md cursor-grab active:cursor-grabbing select-none"
          style={{ left: `calc(${pctMax}% - 8px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          onMouseDown={handleMaxMouseDown}
          onTouchStart={handleMaxTouchStart}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') onChangeMax(Math.max(valueMax - 30, valueMin + 1))
            if (e.key === 'ArrowRight') onChangeMax(Math.min(valueMax + 30, max))
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-secondary">{formatValue(valueMin)}</span>
        <span className="text-xs text-secondary">{formatValue(valueMax)}</span>
      </div>
    </div>
  )
}

function SingleRangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue,
  leftLabel,
}: {
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  formatValue: (v: number) => string
  leftLabel?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pct = ((Math.min(value, max) - min) / (max - min)) * 100

  function pxToValue(clientX: number): number {
    if (!trackRef.current) return min
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const raw = min + ratio * (max - min)
    return Math.round(raw / step) * step
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const onMove = (ev: MouseEvent) => onChange(pxToValue(ev.clientX))
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [onChange, step])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const onMove = (ev: TouchEvent) => onChange(pxToValue(ev.touches[0].clientX))
    const onEnd = () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }, [onChange, step])

  return (
    <div className="relative h-5 flex items-center" ref={trackRef}>
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted">
        <div className="absolute h-1.5 rounded-full bg-theme left-0" style={{ right: `${100 - pct}%` }} />
      </div>
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        className="absolute w-4 h-4 rounded-full bg-theme border-2 border-white shadow-md cursor-grab active:cursor-grabbing select-none"
        style={{ left: `calc(${pct}% - 8px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') onChange(Math.max(value - step, min))
          if (e.key === 'ArrowRight') onChange(Math.min(value + step, max))
        }}
      />
    </div>
  )
}

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

  const maxPrice = filters.maxPrice ?? priceRange.max
  const maxStops = filters.maxStops ?? 2

  return (
    <div className="w-full text-sm">
      {/* Price Range */}
      <DualRangeSlider
        label="Price Range"
        min={priceRange.min}
        max={priceRange.max}
        valueMin={priceRange.min}
        valueMax={maxPrice}
        onChangeMin={() => {}}
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
