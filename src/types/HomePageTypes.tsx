
//Trending section types
export interface TrendingDestination {
  id: number;
  city: string;
  category: string;
  dateRange: string;
  description: string;
  image: string;
  rating: number | null;
  isFavorited?: boolean;
}

//Past offers section types
export interface PastOffer {
  id: number;
  type: string;
  image: string;
  reviewCount: number;
  rating: number;
  isFavorited?: boolean;
  href?: string;
}
