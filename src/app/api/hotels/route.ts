import { NextResponse } from 'next/server'
import { generateHotelsForSearch } from '@/lib/mock/hotelGenerator'
import { paginate, HOTELS_PAGE_SIZE } from '@/lib/utils/pagination'

const SIMULATED_DELAY_MS = 800

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const destination = searchParams.get('destination') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const adults = Math.max(1, Number(searchParams.get('adults') ?? 2))
  const children = Math.max(0, Number(searchParams.get('children') ?? 0))
  const rooms = Math.max(1, Number(searchParams.get('rooms') ?? 1))
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit') ?? HOTELS_PAGE_SIZE)))

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS))

  const allResults = generateHotelsForSearch(destination)

  const { items: results, hasMore, total } = paginate(allResults, page, limit)

  const locations = [...new Set(allResults.map((h) => h.location))].sort()
  const starRatings = [...new Set(allResults.map((h) => h.starRating))].sort((a, b) => b - a)
  const priceRange =
    allResults.length > 0
      ? {
          min: Math.min(...allResults.map((h) => h.pricePerNight)),
          max: Math.max(...allResults.map((h) => h.pricePerNight)),
        }
      : { min: 0, max: 0 }

  return NextResponse.json({
    hotels: results,
    meta: {
      total,
      page,
      limit,
      hasMore,
      destination: destination || null,
      checkIn: checkIn || null,
      checkOut: checkOut || null,
      adults,
      children,
      rooms,
      locations,
      starRatings,
      priceRange,
    },
  })
}
