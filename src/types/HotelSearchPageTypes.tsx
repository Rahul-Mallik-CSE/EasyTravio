export interface HotelSearchItem {
  id: string
  name: string
  location: string
  city: string
  distanceToShore: string
  distanceValue: number
  breakfastIncluded: boolean
  allInclusive: boolean
  freeCancellation: boolean
  adults: number
  children: number
  nights: number
  theme: string
  roomType: string
  bedType: 'twoSingle' | 'king' | 'babyCots' | 'double' | 'single'
  rating: number
  ratingLabel: string
  reviewCount: number
  discountPercent: number
  pricePerNight: number
  sustainabilityLevel: number
  availableAtDiscount: number
  isVip: boolean
  available: boolean
  image: string
  starRating: number
  pool: boolean
  petFriendly: boolean
  ownBathroom: boolean
  kitchen: boolean
  seaView: boolean
  babyBed: boolean
  bathtub: boolean
  sauna: boolean
  fitnessCentre: boolean
  bar: boolean
  steamBath: boolean
  yoga: boolean
}

export interface HotelSearchParams {
  destination: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  rooms: number
}

export type HotelSortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'stars-desc' | 'distance-asc'

export interface HotelSearchMeta {
  total: number
  page: number
  limit: number
  hasMore: boolean
  destination: string | null
  checkIn: string | null
  checkOut: string | null
  adults: number
  children: number
  rooms: number
  locations: string[]
  starRatings: number[]
  priceRange: { min: number; max: number }
}

export interface HotelFilters {
  minPrice: number | null
  maxPrice: number | null
  breakfastIncluded: boolean
  allInclusive: boolean
  freeCancellation: boolean
  pool: boolean
  petFriendly: boolean
  ownBathroom: boolean
  kitchen: boolean
  seaView: boolean
  babyBed: boolean
  bathtub: boolean
  guestRating: 'all' | 'outstanding' | 'veryGood' | 'good' | 'excellent' | 'poor'
  bedType: 'all' | 'twoSingle' | 'king' | 'babyCots' | 'double' | 'single'
  sauna: boolean
  fitnessCentre: boolean
  bar: boolean
  steamBath: boolean
  yoga: boolean
  sustainabilityLevel: 'any' | 'level2' | 'level3'
  stars: 'any' | '5' | '4' | '3'
  distance: 'any' | '1km' | '5km' | '15km'
}

export interface HotelReview {
  id: number
  name: string
  countryCode: string
  avatarImage: string
  description: string
  date: string
}

export interface HotelFAQ {
  id: number
  question: string
  answer: string
}

export interface HotelDetail extends HotelSearchItem {
  address: string
  phone: string
  email: string
  description: string
  gallery: string[]
  amenities: string[]
  checkInTime: string
  checkOutTime: string
  rules: string[]
  faqs: HotelFAQ[]
  reviews: HotelReview[]
  reviewRates: {
    staffPoliteness: number
    vipOptions: number
    freeWifiSpeed: number
    cleanliness: number
    accessToCityCenter: number
  }
}
