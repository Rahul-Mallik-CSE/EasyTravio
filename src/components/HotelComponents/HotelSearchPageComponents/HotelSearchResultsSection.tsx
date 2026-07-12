'use client'
import { useMemo, useRef, useEffect } from 'react'
import { Building2 } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import HotelFilterSide from './SubComponents/HotelFilterSide'
import HotelSortBar from './SubComponents/HotelSortBar'
import HotelListCard from './SubComponents/HotelListCard'
import StateDisplay from '@/components/CommonComponents/StateDisplay'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loadMoreHotels } from '@/redux/HotelSlice/hotelSearchSlice'
import { filterHotels, sortHotels } from '@/lib/utils/hotelHelpers'

export default function HotelSearchResultsSection() {
  const dispatch = useAppDispatch()
  const { hotels, meta, status, loadMoreStatus } = useAppSelector((state) => state.hotelSearch)
  const { filters, sortBy } = useAppSelector((state) => state.hotelFilters)

  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef({ hasMore: false, isLoadingMore: false })

  const filteredAndSorted = useMemo(() => {
    const filtered = filterHotels(hotels, filters)
    return sortHotels(filtered, sortBy)
  }, [hotels, filters, sortBy])

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
          dispatch(loadMoreHotels())
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hotels.length, hasMore, dispatch])

  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      {/* Mobile filter toggle */}
      {hasSearched && (
        <div className="flex md:hidden items-center justify-between mb-4">
          <p className="text-sm text-secondary">
            <span className="font-semibold text-foreground">{filteredAndSorted.length}</span> hotels found
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 border border-theme text-theme rounded-sm px-3 py-2 text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer">
                Filters
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-5">
              <p className="text-base font-bold mb-4">Filters</p>
              <HotelFilterSide
                priceRange={meta?.priceRange ?? { min: 0, max: 1000 }}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Filter sidebar — desktop only */}
        {hasSearched && (
          <aside className="hidden md:block w-44 lg:w-60 shrink-0">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2">
              <HotelFilterSide
                priceRange={meta?.priceRange ?? { min: 0, max: 1000 }}
              />
            </div>
          </aside>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <StateDisplay
              icon={Building2}
              loading
              title="Searching for the best hotels…"
              subtitle="Comparing prices across top providers"
            />
          ) : isEmpty ? (
            <StateDisplay
              icon={Building2}
              title="No hotels match your filters"
              subtitle="Try adjusting your filters or search for different destinations."
            />
          ) : hasSearched ? (
            <>
              <HotelSortBar resultCount={filteredAndSorted.length} />

              <div className="flex flex-col gap-4">
                {filteredAndSorted.map((hotel) => (
                  <HotelListCard key={hotel.id} hotel={hotel} />
                ))}
              </div>

              {/* Loading more indicator */}
              {isLoadingMore && (
                <div className="flex justify-center py-6">
                  <div className="flex items-center gap-3 text-sm text-secondary">
                    <div className="w-5 h-5 rounded-full border-2 border-muted border-t-theme animate-spin" />
                    Loading more hotels…
                  </div>
                </div>
              )}

              {/* Sentinel element for infinite scroll */}
              {hasMore && <div ref={sentinelRef} className="h-1" />}
            </>
          ) : (
            <StateDisplay
              icon={Building2}
              title="Search for hotels above"
              subtitle="Enter your destination and travel dates to get started."
            />
          )}
        </div>
      </div>
    </section>
  )
}
