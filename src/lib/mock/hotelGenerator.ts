import type { HotelSearchItem } from '@/types/HotelSearchPageTypes'

export const MOCK_HOTEL_COUNT = 200

const CITIES = [
  { name: 'Gothenburg', country: 'Sweden' },
  { name: 'Stockholm', country: 'Sweden' },
  { name: 'Copenhagen', country: 'Denmark' },
  { name: 'Oslo', country: 'Norway' },
  { name: 'Helsinki', country: 'Finland' },
  { name: 'Amsterdam', country: 'Netherlands' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'Prague', country: 'Czech Republic' },
  { name: 'Vienna', country: 'Austria' },
  { name: 'Zurich', country: 'Switzerland' },
]

const HOTEL_CHAINS = [
  'Radisson Blu', 'Grand Hyatt', 'Marriott', 'Hilton Garden Inn', 'Intercontinental',
  'Four Seasons', 'Novotel', 'Sofitel Luxury', 'Wyndham Garden', 'Sheraton Grand',
  'Holiday Inn Express', 'Crowne Plaza', 'The Westin Resort', 'Ibis Styles',
  'The Ritz-Carlton', 'Mövenpick Hotel', 'Kempinski Palace', 'Pullman Resort',
  'Anantara Villas', 'Best Western Plus', 'Comfort Inn', 'Mercure Hotel',
  'Scandic Hotels', 'Nordic Light Hotel', 'Elite Stadshotell',
]

const LOCATIONS = [
  'Downtown', 'City Centre', 'Waterfront', 'Midtown', 'Old Town',
  'Beachfront', 'Business District', 'Historic Quarter', 'Suburbs',
  'Marina District', 'Airport Zone', 'Coastal Strip', 'Central Station',
  'Luxury Mile', 'Harbour Side', 'Royal Quarter', 'Golf Estate', 'Private Island',
]

const DISTANCES = [
  { label: '50m Distance to Shore', value: 0.05 },
  { label: '200m Distance to Shore', value: 0.2 },
  { label: '500m Distance to Shore', value: 0.5 },
  { label: '700m Distance to Sea', value: 0.7 },
  { label: '1km Distance to Shore', value: 1 },
  { label: '1.2km Distance to Beach', value: 1.2 },
  { label: '2km Distance to Shore', value: 2 },
  { label: '3km Distance to Shore', value: 3 },
  { label: '5km Distance to Shore', value: 5 },
  { label: '8km Distance to Shore', value: 8 },
  { label: '12km Distance to Shore', value: 12 },
  { label: 'On The Shore', value: 0 },
]

const THEMES = [
  'Experience Unique Opportunity', 'Traditional Room Design', 'Sunny Moments With Family Facilities',
  'Modern Soundings', 'Luxury Urban Retreat', 'Romantic Getaway', 'Business & Leisure',
  'Heritage & Culture', 'Ultimate Luxury', 'Corporate Comfort', 'French Elegance',
  'Family Paradise', 'Marina Views & Dining', 'Transit Comfort', 'Classic Elegance',
  'Wellness & Spa', 'Smart & Stylish', 'Timeless Prestige', 'Swiss Chocolate Experience',
  'Royal Experience', 'Sports & Recreation', 'Overwater Seclusion', 'Urban Explorer',
  'Nordic Retreat', 'Seaside Serenity',
]

const ROOM_TYPES = [
  'Standard rooms', 'Deluxe King Room', 'Ocean View Suite', 'Standard Queen Room',
  'Family Suite With Garden View', 'Premium Beachfront Villa', 'Executive Single Room',
  'Superior Room With City View', 'Connecting Family Rooms', 'Club Level Marina Suite',
  'Standard Room', 'Deluxe Double With Pool View', 'Heavenly Spa Suite',
  'Cozy Smart Room', 'Signature Club Level Room', 'Superior Harbour View Room',
  'Palace Grand Suite', 'Golf View Premium Room', 'Overwater Bungalow',
  'Classic Room Design With Cultural Foods', 'See View Balconies',
  'Special Leisure Activities', 'Historical Café And Bar', 'Nordic Design Suite',
  'Panoramic City Loft',
]

const BED_TYPES: HotelSearchItem['bedType'][] = ['twoSingle', 'king', 'babyCots', 'double', 'single']

const RATING_LABELS = [
  { min: 9, label: 'Outstanding' },
  { min: 8.5, label: 'Excellent' },
  { min: 8, label: 'Very Good' },
  { min: 7, label: 'Good' },
  { min: 0, label: 'Poor' },
]

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80',
  'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
  'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600&q=80',
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80',
  'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80',
  'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80',
]

const hashString = (value: string): number => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const pick = <T>(arr: readonly T[], seed: number): T => arr[seed % arr.length]

const buildHotelId = (cityIndex: number, chainIndex: number, index: number): string =>
  `htl-${String(cityIndex).padStart(2, '0')}-${String(chainIndex).padStart(2, '0')}-${String(index).padStart(3, '0')}`

export const parseHotelId = (id: string) => {
  const match = id.match(/^htl-(\d{2})-(\d{2})-(\d{3})$/)
  if (!match) return null
  return { cityIndex: Number(match[1]), chainIndex: Number(match[2]), index: Number(match[3]) }
}

const getRatingLabel = (rating: number): string => {
  for (const { min, label } of RATING_LABELS) {
    if (rating >= min) return label
  }
  return 'Poor'
}

const createTemplateHotel = (cityIndex: number, chainIndex: number, index: number): HotelSearchItem => {
  const seed = hashString(`${cityIndex}-${chainIndex}-${index}`)
  const city = CITIES[cityIndex]
  const chain = HOTEL_CHAINS[chainIndex]
  const location = pick(LOCATIONS, seed)
  const distance = pick(DISTANCES, seed + 1)
  const theme = pick(THEMES, seed + 2)
  const roomType = pick(ROOM_TYPES, seed + 3)
  const bedType = pick(BED_TYPES, seed + 4)
  const starRating = 3 + (seed % 3)
  const rating = 6 + seededRandom(seed + 5) * 4
  const roundedRating = Math.round(rating * 10) / 10
  const reviewCount = 100 + (seed % 7000)
  const basePrice = 60 + (seed % 600)
  const discountPercent = seededRandom(seed + 6) > 0.6 ? 5 + Math.floor(seededRandom(seed + 7) * 35) : 0
  const pricePerNight = discountPercent > 0 ? Math.round(basePrice * (1 - discountPercent / 100)) : basePrice
  const availableAtDiscount = 1 + (seed % 20)
  const sustainabilityLevel = 2 + (seed % 4)
  const imageIndex = (cityIndex + chainIndex + index) % UNSPLASH_IMAGES.length

  const hasBreakfast = seededRandom(seed + 8) > 0.3
  const hasAllInclusive = seededRandom(seed + 9) > 0.8
  const hasPool = seededRandom(seed + 10) > 0.5
  const hasPetFriendly = seededRandom(seed + 11) > 0.7
  const hasFreeCancellation = seededRandom(seed + 12) > 0.4
  const hasOwnBathroom = seededRandom(seed + 13) > 0.2
  const hasKitchen = seededRandom(seed + 14) > 0.6
  const hasSeaView = seededRandom(seed + 15) > 0.5
  const hasBabyBed = seededRandom(seed + 16) > 0.6
  const hasBathtub = seededRandom(seed + 17) > 0.5
  const hasSauna = seededRandom(seed + 18) > 0.7
  const hasFitness = seededRandom(seed + 19) > 0.4
  const hasBar = seededRandom(seed + 20) > 0.4
  const hasSteamBath = seededRandom(seed + 21) > 0.8
  const hasYoga = seededRandom(seed + 22) > 0.8
  const isVip = seededRandom(seed + 23) > 0.75
  const isAvailable = seededRandom(seed + 24) > 0.1
  const adults = 1 + (seed % 3)
  const children = seededRandom(seed + 25) > 0.5 ? seed % 3 : 0
  const nights = 1 + (seed % 7)

  return {
    id: buildHotelId(cityIndex, chainIndex, index),
    name: chain,
    location,
    city: city.name,
    distanceToShore: distance.label,
    distanceValue: distance.value,
    breakfastIncluded: hasBreakfast,
    allInclusive: hasAllInclusive,
    freeCancellation: hasFreeCancellation,
    adults,
    children,
    nights,
    theme,
    roomType,
    bedType,
    rating: roundedRating,
    ratingLabel: getRatingLabel(roundedRating),
    reviewCount,
    discountPercent,
    pricePerNight,
    sustainabilityLevel,
    availableAtDiscount,
    isVip,
    available: isAvailable,
    image: UNSPLASH_IMAGES[imageIndex],
    starRating,
    pool: hasPool,
    petFriendly: hasPetFriendly,
    ownBathroom: hasOwnBathroom,
    kitchen: hasKitchen,
    seaView: hasSeaView,
    babyBed: hasBabyBed,
    bathtub: hasBathtub,
    sauna: hasSauna,
    fitnessCentre: hasFitness,
    bar: hasBar,
    steamBath: hasSteamBath,
    yoga: hasYoga,
  }
}

export const buildMockHotelCatalog = (count = MOCK_HOTEL_COUNT): HotelSearchItem[] => {
  const hotels: HotelSearchItem[] = []
  let index = 0

  while (hotels.length < count) {
    const cityIndex = index % CITIES.length
    const chainIndex = Math.floor(index / CITIES.length) % HOTEL_CHAINS.length
    hotels.push(createTemplateHotel(cityIndex, chainIndex, index))
    index++
  }

  return hotels.slice(0, count)
}

let catalogCache: HotelSearchItem[] | null = null

export const getMockHotelCatalog = (): HotelSearchItem[] => {
  catalogCache ??= buildMockHotelCatalog()
  return catalogCache
}

export const generateHotelsForSearch = (destination: string): HotelSearchItem[] => {
  const catalog = getMockHotelCatalog()
  if (!destination) return catalog
  const lowerDest = destination.toLowerCase()
  return catalog.filter(
    (hotel) =>
      hotel.city.toLowerCase().includes(lowerDest) ||
      hotel.location.toLowerCase().includes(lowerDest) ||
      hotel.name.toLowerCase().includes(lowerDest)
  )
}

export const findHotelById = (id: string): HotelSearchItem | undefined => {
  return getMockHotelCatalog().find((hotel) => hotel.id === id)
}
