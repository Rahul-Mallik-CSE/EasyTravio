import type { HotelDestinationCardData } from '@/types/HotelLandingPageTypes'

export const flightHeroImage =
  'https://images.unsplash.com/photo-1753621340695-bbb906391594?auto=format&fit=crop&w=2000&q=80'

export const travelTogetherCards: HotelDestinationCardData[] = [
  {
    id: 1,
    title: 'Washington',
    subtitle: 'Wed 25 Jan-Fri 27 Jan',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    categoryKeys: ['special-offers', 'last-search', 'trending-destinations', 'highest-reviewed', 'top-rated'],
    desktopClassName: 'left-1 top-8',
  },
  {
    id: 2,
    title: 'China',
    subtitle: 'Fri 30 Dec-Tue 4 Jan',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    categoryKeys: ['special-offers', 'last-search', 'trending-destinations'],
    desktopClassName: 'right-[10%] lg:right-[30%] top-0',
  },
  {
    id: 3,
    title: 'Philippines',
    subtitle: 'Sun 28 Apr-Tue 5 Maj',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    categoryKeys: ['special-offers', 'highest-reviewed', 'top-rated'],
    desktopClassName: 'right-2 top-34',
  },
  {
    id: 4,
    title: 'Columbia',
    subtitle: 'Sat 13 Jan-Thu 15 Jan',
    image: 'https://images.unsplash.com/photo-1440778303588-435521a205bc?auto=format&fit=crop&w=900&q=80',
    categoryKeys: ['special-offers', 'last-search', 'top-rated'],
    desktopClassName: 'left-[2%] lg:left-[10%] top-60 ',
  },
  {
    id: 5,
    title: 'Berlin',
    subtitle: 'Wed 25 Jan-Fri 27 Jan',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80',
    categoryKeys: ['special-offers', 'trending-destinations', 'highest-reviewed'],
    desktopClassName: 'left-1/2 top-65',
  },
]

export const fallIntoTravelImages = [
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80',
]


export const AIRLINE_IMAGES: Record<string, string> = {
  'Biman Bangladesh': 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&h=400&fit=crop',
  'Emirates': 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&h=400&fit=crop',
  'Qatar Airways': 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=400&fit=crop',
  'Singapore Airlines': 'https://images.unsplash.com/photo-1753621343732-aee881910914?w=800&h=400&fit=crop',
  'AirAsia': 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=400&fit=crop',
  'Turkish Airlines': 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&h=400&fit=crop',
}

export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1628964178609-aec11c666040?w=800&h=400&fit=crop'
