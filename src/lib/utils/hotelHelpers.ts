import type { HotelSearchItem, HotelFilters, HotelSortOption } from '@/types/HotelSearchPageTypes'

export const filterHotels = (hotels: HotelSearchItem[], filters: HotelFilters): HotelSearchItem[] =>
  hotels.filter((hotel) => {
    if (filters.minPrice !== null && hotel.pricePerNight < filters.minPrice) return false
    if (filters.maxPrice !== null && hotel.pricePerNight > filters.maxPrice) return false
    if (filters.breakfastIncluded && !hotel.breakfastIncluded) return false
    if (filters.allInclusive && !hotel.allInclusive) return false
    if (filters.freeCancellation && !hotel.freeCancellation) return false
    if (filters.pool && !hotel.pool) return false
    if (filters.petFriendly && !hotel.petFriendly) return false
    if (filters.ownBathroom && !hotel.ownBathroom) return false
    if (filters.kitchen && !hotel.kitchen) return false
    if (filters.seaView && !hotel.seaView) return false
    if (filters.babyBed && !hotel.babyBed) return false
    if (filters.bathtub && !hotel.bathtub) return false
    if (filters.sauna && !hotel.sauna) return false
    if (filters.fitnessCentre && !hotel.fitnessCentre) return false
    if (filters.bar && !hotel.bar) return false
    if (filters.steamBath && !hotel.steamBath) return false
    if (filters.yoga && !hotel.yoga) return false

    if (filters.guestRating !== 'all') {
      if (filters.guestRating === 'outstanding' && hotel.rating < 9) return false
      if (filters.guestRating === 'veryGood' && hotel.rating < 8) return false
      if (filters.guestRating === 'good' && hotel.rating < 7) return false
      if (filters.guestRating === 'excellent' && hotel.rating < 8.5) return false
      if (filters.guestRating === 'poor' && hotel.rating >= 7) return false
    }

    if (filters.bedType !== 'all' && hotel.bedType !== filters.bedType) return false

    if (filters.sustainabilityLevel !== 'any') {
      if (filters.sustainabilityLevel === 'level2' && hotel.sustainabilityLevel < 2) return false
      if (filters.sustainabilityLevel === 'level3' && hotel.sustainabilityLevel < 3) return false
    }

    if (filters.stars !== 'any') {
      const minStars = Number(filters.stars)
      if (hotel.starRating !== minStars) return false
    }

    if (filters.distance !== 'any') {
      const maxKm = filters.distance === '1km' ? 1 : filters.distance === '5km' ? 5 : 15
      if (hotel.distanceValue > maxKm) return false
    }

    return true
  })

export const sortHotels = (hotels: HotelSearchItem[], sortBy: HotelSortOption): HotelSearchItem[] => {
  const sorted = [...hotels]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.pricePerNight - b.pricePerNight)
    case 'price-desc':
      return sorted.sort((a, b) => b.pricePerNight - a.pricePerNight)
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'stars-desc':
      return sorted.sort((a, b) => b.starRating - a.starRating)
    case 'distance-asc':
      return sorted.sort((a, b) => a.distanceValue - b.distanceValue)
    default:
      return sorted
  }
}

export const formatHotelPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
