

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
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Belgium.png',
    categoryKeys: ['special-offers', 'highest-reviewed', 'top-rated'],
    desktopClassName: 'left-4 top-4 md:left-6 md:top-4',
  },
  {
    id: 2,
    title: 'Amsterdam',
    subtitle: 'Bunk',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Amsterdam.png',
    categoryKeys: ['special-offers', 'last-search', 'trending-destinations'],
    desktopClassName: 'right-4 top-6 md:right-6 md:top-6',
  },
  {
    id: 3,
    title: 'New Jersey',
    subtitle: 'Windsor',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/NewJersey.png',
    categoryKeys: ['special-offers', 'last-search', 'top-rated'],
    desktopClassName: 'left-6 bottom-24 md:left-8 md:bottom-30',
  },
  {
    id: 4,
    title: 'Nepal',
    subtitle: 'Hyatt Regency K',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Nepal.png',
    categoryKeys: ['special-offers', 'last-search', 'highest-reviewed'],
    desktopClassName: 'left-1/2 top-1/2 md:left-1/2 md:top-[38%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    id: 5,
    title: 'Gothenburg',
    subtitle: 'First Hotel G',
    image: '/HotelImages/LandingPageImages/HotelHeroImages/Gothenburg.png',
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
      image: '/HotelImages/LandingPageImages/OffersImages/LoyaltyDiscounts.png',
      spanClassName: 'lg:col-span-1',
    },
    {
      label: 'Early Booking Discounts',
      image: '/HotelImages/LandingPageImages/OffersImages/EarlyBookingDiscounts.png',
      spanClassName: 'lg:col-span-2',
    },
    {
      label: 'Last-Minute Deals',
      image: '/HotelImages/LandingPageImages/OffersImages/LastMinuteDeals.png',
      spanClassName: 'lg:col-span-1',
    },
    {
      label: 'Family Packages',
      image: '/HotelImages/LandingPageImages/OffersImages/FamilyPackages.png',
      spanClassName: 'lg:col-span-1',
    },
    {
      label: 'Birthday Or Anniversary Specials',
      image: '/HotelImages/LandingPageImages/OffersImages/BirthdayorAnniversarySpecials.png',
      spanClassName: 'lg:col-span-2',
    },
    {
      label: 'Referral Programs',
      image: '/HotelImages/LandingPageImages/OffersImages/ReferralPrograms.png',
      spanClassName: 'md:col-span-1',
    },
  ],
}

// Review Section Data 


export const reviewSectionData: ReviewSectionData = {
  backgroundImage:
    "/HotelImages/LandingPageImages/ReviewImages/ReviewBanner.png",

  reviews: [
    {
      id: 1,
      name: "Teacher Terece",
      flagEmoji: "🇫🇷",
      countryCode: "FR",
      avatarImage:
        "/HotelImages/LandingPageImages/ReviewImages/Photo.png",
      description:
        "Returning to this hotel is always a delight – their loyalty program showers us with exclusive discounts and amazing perks!",
    },
    {
      id: 2,
      name: "BEYU68£",
      flagEmoji: "🇳🇴",
      countryCode: "NO",
      avatarImage:
        "/HotelImages/LandingPageImages/ReviewImages/Photo (1).png",
      description:
        "Accessing EasySet24 extraordinary special offers makes always our journey even more unforgettable.",
    },
    {
      id: 3,
      name: "Elina13ay",
      flagEmoji: "🇨🇦",
      countryCode: "CA",
      avatarImage:
        "/HotelImages/LandingPageImages/ReviewImages/Photo (2).png",
      description:
        "Weekends here are pure bliss with their carefully crafted packages, and the extended stay discounts make relaxation even more enticing.",
    },
  ],
};