import { Plane } from 'lucide-react'
import { getStopsLabel } from '@/lib/utils/flightHelpers'
import { getRouteCode } from '@/lib/utils/flightDetailHelpers'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailRouteViewProps {
  flight: FlightDetail
}

export default function FlightDetailRouteView({ flight }: FlightDetailRouteViewProps) {
  const stopsLabel = getStopsLabel(flight.stops)

  const stopCityCode = flight.stopCity === 'Rome'
    ? 'FCO'
    : flight.stopCity === 'Chicago'
      ? 'ORD'
      : flight.stopCity === 'Dallas'
        ? 'DFW'
        : flight.stopCity?.slice(0, 3).toUpperCase() ?? ''

  return (
    <div className="px-5 py-4">
      {/* Airports */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-4">
        <div>
          <p className="text-2xl font-bold text-theme">{flight.departureAirport.code}</p>
          <p className="text-sm font-semibold text-foreground">{flight.departureAirport.city}</p>
          <p className="text-xs text-secondary">CET({flight.depart})</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          {flight.stopCity ? (
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-border flex items-center justify-center">
              <span className="text-xs font-bold text-foreground text-center leading-tight">
                {stopCityCode}
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-border flex items-center justify-center">
              <Plane className="w-4 h-4 text-theme" />
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-theme">{flight.arrivalAirport.code}</p>
          <p className="text-sm font-semibold text-foreground">{flight.arrivalAirport.city}</p>
          <p className="text-xs text-secondary">CET({flight.arrive})</p>
        </div>
      </div>

      {/* Gates row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-3">
        <div>
          <p className="text-xs text-secondary">Gate</p>
          <p className="text-3xl font-bold text-foreground">{flight.departureAirport.gate}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          {flight.stopCity && (
            <div className="text-center">
              <p className="text-xs text-secondary">
                CET({flight.depart === '12:00' ? '18:00' : flight.depart})
              </p>
              <p className="text-sm font-semibold text-foreground">{flight.stopCity}</p>
              <p className="text-xs text-secondary">
                CET({flight.arrive === '15:20' ? '20:00' : flight.arrive})
              </p>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-secondary">Gate</p>
          <p className="text-3xl font-bold text-foreground">{flight.arrivalAirport.gate}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative my-3 flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-theme to-blue-400 rounded-full"
            style={{ width: flight.stops > 0 ? '60%' : '100%' }}
          />
        </div>
        <Plane className="w-5 h-5 text-theme" />
      </div>

      {/* Route details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted rounded-md p-2.5 text-xs">
          <p className="font-semibold text-foreground">
            {flight.departureAirport.code} · Entrance {flight.departureAirport.terminal} — Gate {flight.departureAirport.gate}
          </p>
          <p className="text-theme mt-0.5">+{getRouteCode(`${flight.id}-departure`, 400000, 499999)}</p>
        </div>
        <div className="bg-muted rounded-md p-2.5 text-xs">
          {flight.stops > 0 ? (
            <>
              <p className="font-semibold text-foreground">
                {flight.arrivalAirport.code} · Exit L
              </p>
              <p className="text-theme mt-0.5">+{getRouteCode(`${flight.id}-arrival-stop`, 800000, 899999)}</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-foreground">
                {flight.arrivalAirport.code} · Gate {flight.arrivalAirport.gate}
              </p>
              <p className="text-theme mt-0.5">+{getRouteCode(`${flight.id}-arrival-direct`, 300000, 399999)}</p>
            </>
          )}
        </div>

        {flight.stops > 0 && (
          <>
            <div className="bg-muted rounded-md p-2.5 text-xs">
              <p className="font-semibold text-foreground">
                {flight.departureAirport.code} — Gate {flight.arrivalAirport.gate}
              </p>
              <p className="text-theme mt-0.5">+{getRouteCode(`${flight.id}-transfer`, 390000, 489999)}</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-md p-2.5 text-xs">
              <p className="font-semibold text-foreground">
                {stopsLabel}
              </p>
              <p className="text-red-500 mt-0.5 text-xs">It is Not Possible To Exit The Airport</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
