

//offer Section data

import { OffersSectionData } from "@/types/HotelLandingPageTypes";


export const offersSectionData: OffersSectionData = {
  sectionTitle: 'Special Offers',
  offers: [
    {
      label: 'Loyalty Discounts',
      image: '/HotelImages/LandingPageImages/OffersImages/LoyaltyDiscounts.png',
      spanClassName: 'md:col-span-1',
    },
    {
      label: 'Early Booking Discounts',
      image: '/HotelImages/LandingPageImages/OffersImages/EarlyBookingDiscounts.png',
      spanClassName: 'md:col-span-2',
    },
    {
      label: 'Last-Minute Deals',
      image: '/HotelImages/LandingPageImages/OffersImages/LastMinuteDeals.png',
      spanClassName: 'md:col-span-1',
    },
    {
      label: 'Family Packages',
      image: '/HotelImages/LandingPageImages/OffersImages/FamilyPackages.png',
      spanClassName: 'md:col-span-1',
    },
    {
      label: 'Birthday Or Anniversary Specials',
      image: '/HotelImages/LandingPageImages/OffersImages/BirthdayorAnniversarySpecials.png',
      spanClassName: 'md:col-span-2',
    },
    {
      label: 'Referral Programs',
      image: '/HotelImages/LandingPageImages/OffersImages/ReferralPrograms.png',
      spanClassName: 'md:col-span-1',
    },
  ],
}