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