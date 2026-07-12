import type { HotelSearchItem, HotelDetail, HotelReview, HotelFAQ } from '@/types/HotelSearchPageTypes'

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

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
]

const DESCRIPTIONS = [
  'This stylish and roomy family home is nestled in the heart of the city, just minutes away from the Royal Opera, Museum of Medieval Stockholm, and Stockholm Cathedral. The central location makes it an ideal base for exploring the city. For convenience, Bromma Stockholm Airport is the closest airport, located just 8 km away from this charming home.',
  'Your stay at our hotel includes a complimentary breakfast to kickstart your day, and our rooms feature a cozy and comfortable retreat. Select rooms feature a refrigerator and stovetop for those who prefer to prepare their own meals. Our dedicated staff is at your service, ensuring a seamless and enjoyable experience throughout your stay.',
  'Nestled in a prime waterfront location, this exceptional property offers breathtaking views and unparalleled comfort. The hotel features modern amenities including a state-of-the-art fitness center, infinity pool, and world-class dining. Every detail has been thoughtfully curated to make your stay special.',
  'Experience the perfect blend of luxury and convenience at this centrally located hotel. With easy access to major attractions, shopping districts, and cultural landmarks, youll never run out of things to do. The hotel offers spacious rooms with premium bedding and modern amenities.',
  'Discover a tranquil oasis in the heart of the bustling city. This boutique hotel combines Scandinavian design with warm hospitality. Enjoy our complimentary wellness center, artisanal breakfast, and personalized concierge service that will make your stay unforgettable.',
]

const RULES = [
  'Check-in is from 3:00 PM and check-out is until 11:00 AM.',
  'Pets are not allowed on the premises.',
  'Smoking is prohibited in all indoor areas.',
  'Guests must present a valid ID at check-in.',
  'Quiet hours are observed from 10:00 PM to 8:00 AM.',
  'The hotel reserves the right to pre-authorize credit cards.',
]

const FAQ_QUESTIONS: Omit<HotelFAQ, 'id'>[] = [
  { question: 'How And When Do I Pay?', answer: 'Since this option is a non-refundable reservation and there is no cancellation opportunity, payment is usually processed at the time of booking or shortly thereafter.' },
  { question: 'Is There Anti-Allergic Meal?', answer: 'Yes, our restaurant offers anti-allergic meal options. Please inform our staff about your dietary requirements at the time of booking or upon arrival.' },
  { question: 'Does The Hotel Have A Pool?', answer: 'Yes, our hotel features both an indoor heated pool and an outdoor seasonal pool. The indoor pool is open year-round from 6:00 AM to 10:00 PM.' },
  { question: 'Any Identification Documents Is Necessary', answer: 'Yes, a valid government-issued photo ID is required at check-in. For international guests, a passport is required.' },
  { question: 'What Are The Check-In And Check-Out Times?', answer: 'Check-in is available from 3:00 PM onwards. Check-out must be completed by 11:00 AM. Early check-in and late check-out may be available upon request.' },
  { question: 'Why Was I Charged?', answer: 'Charges may include room reservation, taxes, and any additional services used during your stay. Please review your receipt or contact our front desk for a detailed breakdown.' },
  { question: 'Is There A Spa?', answer: 'Yes, our hotel features a full-service spa offering massages, facials, and wellness treatments. Spa appointments can be arranged through the front desk.' },
]

const REVIEW_NAMES = ['Sofia', 'Sebastian', 'Maria', 'Lena', 'Martin', 'Erik', 'Anna', 'Lars']
const REVIEW_COUNTRIES = ['SE', 'DE', 'FR', 'NO', 'FI', 'DK', 'NL', 'CH']
const REVIEW_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
]

const REVIEW_DESCRIPTIONS = [
  'Our time at this hotel was marked by contemporary elegance and thoughtful amenities.',
  'The location was great, and the services were awesome. Everything made our stay super enjoyable.',
  'The hotel exceeded expectations with comfortable rooms, excellent services, and a delightful restaurant. Highly enjoyable!',
  'The hotel was really nice, especially because of the fancy pool and tasty breakfast. It made our stay feel special.',
  'For those seeking a blend of luxury and technology, this hotel is a dream come true.',
  'A wonderful stay with impeccable service. The staff went above and beyond to make us feel welcome.',
  'Beautiful rooms with stunning views. The spa facilities were exceptional and the dining experience was top-notch.',
  'Perfect location for exploring the city. The concierge service was incredibly helpful and professional.',
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

const createTemplateHotel = (cityIndex: number, chainIndex: number, index: number): HotelDetail => {
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

  const streetNames = ['Storgatan', 'Kungsgatan', 'Drottninggatan', 'Vasagatan', 'Hamngatan', 'Odengatan', 'Birger Jarlsgatan', 'Götgatan']
  const streetNumber = 1 + (seed % 50)

  const galleryStart = (imageIndex + 1) % GALLERY_IMAGES.length
  const gallery = [
    UNSPLASH_IMAGES[imageIndex],
    ...Array.from({ length: 4 }, (_, i) => GALLERY_IMAGES[(galleryStart + i) % GALLERY_IMAGES.length]),
  ]

  const selectedAmenities = ['Free Wifi', 'Bathroom', 'Air Conditioning']
  if (hasPool) selectedAmenities.push('Swimming Pool')
  if (hasFitness) selectedAmenities.push('Fitness Center')
  if (hasBar) selectedAmenities.push('Bar & Lounge')
  if (hasSauna) selectedAmenities.push('Spa & Wellness')
  if (hasBreakfast) selectedAmenities.push('Restaurant')
  selectedAmenities.push('Room Service', 'Tea/Coffee Machine', 'Parking Available')

  const reviewCount2 = 5 + (seed % 4)
  const reviews: HotelReview[] = Array.from({ length: reviewCount2 }, (_, i) => ({
    id: i + 1,
    name: pick(REVIEW_NAMES, seed + 30 + i),
    countryCode: pick(REVIEW_COUNTRIES, seed + 40 + i),
    avatarImage: pick(REVIEW_AVATARS, seed + 50 + i),
    description: pick(REVIEW_DESCRIPTIONS, seed + 60 + i),
    date: `2026-${String(1 + (seed + i) % 12).padStart(2, '0')}-${String(1 + (seed + i) % 28).padStart(2, '0')}`,
  }))

  const faqs: HotelFAQ[] = FAQ_QUESTIONS.map((faq, i) => ({
    id: i + 1,
    ...faq,
  }))

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
    address: `${streetNumber} ${pick(streetNames, seed + 26)}, ${city.name}, ${city.country}`,
    phone: `+${seed % 90 + 10}-${seed % 900 + 100}-${seed % 9000 + 1000}`,
    email: `info@${chain.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    description: pick(DESCRIPTIONS, seed + 27),
    gallery,
    amenities: selectedAmenities,
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    rules: RULES,
    faqs,
    reviews,
    reviewRates: {
      staffPoliteness: 7 + Math.round(seededRandom(seed + 70) * 3 * 10) / 10,
      vipOptions: 7 + Math.round(seededRandom(seed + 71) * 3 * 10) / 10,
      freeWifiSpeed: 6 + Math.round(seededRandom(seed + 72) * 4 * 10) / 10,
      cleanliness: 5 + Math.round(seededRandom(seed + 73) * 5 * 10) / 10,
      accessToCityCenter: 7 + Math.round(seededRandom(seed + 74) * 3 * 10) / 10,
    },
  }
}

export const buildMockHotelCatalog = (count = MOCK_HOTEL_COUNT): HotelDetail[] => {
  const hotels: HotelDetail[] = []
  let index = 0

  while (hotels.length < count) {
    const cityIndex = index % CITIES.length
    const chainIndex = Math.floor(index / CITIES.length) % HOTEL_CHAINS.length
    hotels.push(createTemplateHotel(cityIndex, chainIndex, index))
    index++
  }

  return hotels.slice(0, count)
}

let catalogCache: HotelDetail[] | null = null

export const getMockHotelCatalog = (): HotelDetail[] => {
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

export const findHotelById = (id: string): HotelDetail | undefined => {
  return getMockHotelCatalog().find((hotel) => hotel.id === id)
}
