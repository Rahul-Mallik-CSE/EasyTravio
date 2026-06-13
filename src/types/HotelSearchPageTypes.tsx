export interface HotelSearchItem {
  id: number;
  name: string;
  location: string;
  distanceToShore: string;
  breakfastIncluded: boolean;
  adults: number;
  children: number;
  nights: number;
  theme: string;
  roomType: string;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  discountPercent: number;
  pricePerNight: number;
  sustainabilityLevel: number;
  availableAtDiscount: number;
  isVip: boolean;
  favourite: boolean;
  available: boolean;
  image: string;
  starRating: number; // 0–5
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  breakfastIncluded: boolean;
  allInclusive: boolean;
  freeCancellation: boolean;
  pool: boolean;
  petFriendly: boolean;
  // Room Facilities
  ownBathroom: boolean;
  kitchen: boolean;
  seeView: boolean;
  babyBed: boolean;
  bathtub: boolean;
  // Guest Rating
  guestRating: "all" | "outstanding" | "veryGood" | "good" | "excellent" | "poor";
  // Bed Type
  bedType: "all" | "twoSingle" | "king" | "babyCots" | "double" | "single";
  // Leisure
  sauna: boolean;
  fitnessCentre: boolean;
  bar: boolean;
  steamBath: boolean;
  yoga: boolean;
  // Sustainability
  sustainabilityLevel: "any" | "level2" | "level3";
  // Stars
  stars: "any" | "5" | "4" | "3";
  // Distance
  distance: "any" | "1km" | "5km" | "15km";
}