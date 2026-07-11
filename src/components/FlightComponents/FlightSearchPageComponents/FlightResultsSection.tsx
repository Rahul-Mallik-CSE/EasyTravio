'use client'
import { useMemo, useRef, useEffect } from 'react'
import { Plane } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import FlightFilterSidebar from './FlightFilterSidebar'
import FlightSortBar from './FlightSortBar'
import FlightCard from './FlightCard'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loadMoreFlights } from '@/redux/FlightSlice/searchSlice'
import { filterFlights, sortFlights } from '@/lib/utils/flightHelpers'

export default function FlightResultsSection() {
  const dispatch = useAppDispatch()
  const { flights, meta, status, loadMoreStatus } = useAppSelector((state) => state.search)
  const { filters, sortBy } = useAppSelector((state) => state.filters)

  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef({ hasMore: false, isLoadingMore: false })

  const filteredAndSorted = useMemo(() => {
    const filtered = filterFlights(flights, filters)
    return sortFlights(filtered, sortBy)
  }, [flights, filters, sortBy])

  const isLoading = status === 'loading'
  const isLoadingMore = loadMoreStatus === 'loading'
  const hasSearched = status !== 'idle'
  const isEmpty = hasSearched && !isLoading && filteredAndSorted.length === 0
  const hasMore = meta?.hasMore ?? false

  loadMoreRef.current = { hasMore, isLoadingMore }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadMoreRef.current.hasMore && !loadMoreRef.current.isLoadingMore) {
          dispatch(loadMoreFlights())
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [flights.length, hasMore, dispatch])

  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      {/* Mobile filter toggle */}
      {hasSearched && (
        <div className="flex md:hidden items-center justify-between mb-4">
          <p className="text-sm text-secondary">
            <span className="font-semibold text-foreground">{filteredAndSorted.length}</span> flights found
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 border border-theme text-theme rounded-sm px-3 py-2 text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer">
                Filters
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-5">
              <p className="text-base font-bold mb-4">Filters</p>
              <FlightFilterSidebar
                availableAirlines={meta?.airlines ?? []}
                priceRange={meta?.priceRange ?? { min: 0, max: 2000 }}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Filter sidebar — desktop only */}
        {hasSearched && (
          <aside className="hidden md:block w-56 lg:w-60 shrink-0">
            <div className="sticky top-4 max-h-full overflow-y-auto pr-2">
              <FlightFilterSidebar
                availableAirlines={meta?.airlines ?? []}
                priceRange={meta?.priceRange ?? { min: 0, max: 2000 }}
              />
            </div>
          </aside>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-muted border-t-theme animate-spin" />
                <Plane className="absolute inset-0 m-auto w-7 h-7 text-theme" />
              </div>
              <p className="text-base font-semibold text-foreground">Searching for the best flights…</p>
              <p className="text-sm text-secondary">Comparing prices from all airlines</p>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Plane className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-base font-semibold text-foreground">No flights match your filters</p>
              <p className="text-sm text-secondary text-center max-w-xs">
                Try adjusting your filters or search for different dates.
              </p>
            </div>
          ) : hasSearched ? (
            <>
              <FlightSortBar resultCount={filteredAndSorted.length} />

              <div className="flex flex-col gap-4">
                {filteredAndSorted.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>

              {/* Loading more indicator */}
              {isLoadingMore && (
                <div className="flex justify-center py-6">
                  <div className="flex items-center gap-3 text-sm text-secondary">
                    <div className="w-5 h-5 rounded-full border-2 border-muted border-t-theme animate-spin" />
                    Loading more flights…
                  </div>
                </div>
              )}

              {/* Sentinel element for infinite scroll */}
              {hasMore && <div ref={sentinelRef} className="h-1" />}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Plane className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-base font-semibold text-foreground">Search for flights above</p>
              <p className="text-sm text-secondary">Enter your origin, destination and travel date to get started.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
