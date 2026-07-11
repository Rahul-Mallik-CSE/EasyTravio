import React from 'react'

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const period = h < 12 ? 'AM' : 'PM'
  const displayH = h % 12 || 12
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

function minutesToDur(mins: number): string {
  if (mins >= 1440) return 'Any'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
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

const AIRLINES = ['Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa']

export default function FlightFilterSidebar() {
  const departTimeMin = 300
  const departTimeMax = 1200
  const maxDuration = 720
  const pctMin = ((departTimeMin - 0) / 1439) * 100
  const pctMax = ((departTimeMax - 0) / 1439) * 100
  const durPct = ((maxDuration - 60) / (1440 - 60)) * 100

  return (
    <div className="w-full text-sm">
      {/* Departure Time — dual-range */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Departure Time</p>
        <div className="relative h-5 flex items-center">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
          <div
            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-theme pointer-events-none"
            style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
          />
          <div
            className="absolute w-4 h-4 rounded-full bg-theme border-2 border-white shadow-md cursor-grab select-none"
            style={{ left: `calc(${pctMin}% - 8px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          />
          <div
            className="absolute w-4 h-4 rounded-full bg-theme border-2 border-white shadow-md cursor-grab select-none"
            style={{ left: `calc(${pctMax}% - 8px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-secondary">{minutesToTime(departTimeMin)}</span>
          <span className="text-xs text-secondary">{minutesToTime(departTimeMax)}</span>
        </div>
      </div>

      {/* Trip Duration */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Trip Duration</p>
        <div className="relative h-5 flex items-center">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted">
            <div className="absolute h-1.5 rounded-full bg-theme left-0" style={{ right: `${100 - durPct}%` }} />
          </div>
          <div
            className="absolute w-4 h-4 rounded-full bg-theme border-2 border-white shadow-md cursor-grab select-none"
            style={{ left: `calc(${durPct}% - 8px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-secondary">From 1h</span>
          <span className="text-xs text-secondary">{minutesToDur(maxDuration)}</span>
        </div>
      </div>

      {/* Stops */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Stops</p>
        <div className="space-y-2">
          {STOPS_OPTIONS.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked={value === 0}
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
          {AIRLINES.map((airline) => (
            <label key={airline} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-border text-theme accent-theme cursor-pointer"
              />
              <span className="text-xs text-foreground group-hover:text-theme transition-colors">{airline}</span>
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

      {/* Popular Filters */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Popular Filters</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-border accent-theme cursor-pointer"
            />
            <span className="text-xs text-foreground group-hover:text-theme transition-colors">Refundable</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-border accent-theme cursor-pointer"
            />
            <span className="text-xs text-foreground group-hover:text-theme transition-colors">VIP</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-border accent-theme cursor-pointer"
            />
            <span className="text-xs text-foreground group-hover:text-theme transition-colors">Children Friendly</span>
          </label>
        </div>
      </div>

      {/* AI / Random filter */}
      <div className="pt-3 border-t border-border space-y-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="w-3.5 h-3.5 rounded border-border accent-theme cursor-pointer mt-0.5" />
          <span className="text-xs text-secondary">
            Filter With The Help Of AI —{' '}
            <span className="text-theme underline cursor-pointer">see the results here</span>
          </span>
        </label>
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="w-3.5 h-3.5 rounded border-border accent-theme cursor-pointer mt-0.5" defaultChecked />
          <span className="text-xs text-secondary">
            Filter Randomly —{' '}
            <span className="text-theme underline cursor-pointer">see the results here</span>
          </span>
        </label>
      </div>
    </div>
  )
}
