

import { HotelDestinationCardData, HotelHeroTab, HotelHeroTabKey, OffersSectionData, ReviewSectionData } from "@/types/HotelLandingPageTypes";


//hero section data

export const tabs: HotelHeroTab[] = [
  { key: 'special-offers', label: 'Special Offers' },
  { key: 'last-search', label: 'Last Search' },
  { key: 'trending-destinations', label: 'Trending Destinations' },
  { key: 'highest-reviewed', label: 'Highest Reviewed' },
  { key: 'top-rated', label: 'Top Rated' },
]

export const cards: HotelDestinationCardData[] = [
  {
    id: 1,
    title: 'Belgium',
    subtitle: 'Bruxelles Gare Du Midi',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80',
    categoryKeys: ['special-offers', 'highest-reviewed', 'top-rated'],
    desktopClassName: 'left-4 top-4 md:left-6 md:top-4',
  },
  {
    id: 2,
    title: 'Amsterdam',
    subtitle: 'Bunk',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80',
    categoryKeys: ['special-offers', 'last-search', 'trending-destinations'],
    desktopClassName: 'right-4 top-6 md:right-6 md:top-6',
  },
  {
    id: 3,
    title: 'New Jersey',
    subtitle: 'Windsor',
    image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=400&q=80',
    categoryKeys: ['special-offers', 'last-search', 'top-rated'],
    desktopClassName: 'left-6 bottom-24 md:left-8 md:bottom-30',
  },
  {
    id: 4,
    title: 'Nepal',
    subtitle: 'Hyatt Regency K',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
    categoryKeys: ['special-offers', 'last-search', 'highest-reviewed'],
    desktopClassName: 'left-1/2 top-1/2 md:left-1/2 md:top-[38%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    id: 5,
    title: 'Gothenburg',
    subtitle: 'First Hotel G',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&q=80',
    categoryKeys: ['special-offers', 'trending-destinations', 'highest-reviewed'],
    desktopClassName: 'right-8 bottom-8 md:right-14 md:bottom-34',
  },
]

export const mapByTab: Record<HotelHeroTabKey, number[]> = {
  'special-offers': [1, 2, 3, 4, 5],
  'last-search': [2, 3, 4],
  'trending-destinations': [1, 2, 5],
  'highest-reviewed': [1, 4, 5],
  'top-rated': [1, 3, 2],
}

//offer Section data

export const offersSectionData: OffersSectionData = {
  sectionTitle: 'Special Offers',
  offers: [
    {
      label: 'Loyalty Discounts',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      spanClassName: 'lg:col-span-1',
    },
    {
      label: 'Early Booking Discounts',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      spanClassName: 'lg:col-span-2',
    },
    {
      label: 'Last-Minute Deals',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
      spanClassName: 'lg:col-span-1',
    },
    {
      label: 'Family Packages',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
      spanClassName: 'lg:col-span-1',
    },
    {
      label: 'Birthday Or Anniversary Specials',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
      spanClassName: 'lg:col-span-2',
    },
    {
      label: 'Referral Programs',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
      spanClassName: 'md:col-span-1',
    },
  ],
}

// Review Section Data 


export const reviewSectionData: ReviewSectionData = {
  backgroundImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",

  reviews: [
    {
      id: 1,
      name: "Teacher Terece",
      flagEmoji: "🇫🇷",
      countryCode: "FR",
      avatarImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      description:
        "Returning to this hotel is always a delight – their loyalty program showers us with exclusive discounts and amazing perks!",
    },
    {
      id: 2,
      name: "BEYU68£",
      flagEmoji: "🇳🇴",
      countryCode: "NO",
      avatarImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      description:
        "Accessing EasySet24 extraordinary special offers makes always our journey even more unforgettable.",
    },
    {
      id: 3,
      name: "Elina13ay",
      flagEmoji: "🇨🇦",
      countryCode: "CA",
      avatarImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      description:
        "Weekends here are pure bliss with their carefully crafted packages, and the extended stay discounts make relaxation even more enticing.",
    },
  ],
};