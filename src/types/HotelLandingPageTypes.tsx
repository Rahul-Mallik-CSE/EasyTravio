export type HotelHeroTabKey =
	| 'special-offers'
	| 'last-search'
	| 'trending-destinations'
	| 'highest-reviewed'
	| 'top-rated'

export interface HotelHeroTab {
	key: HotelHeroTabKey
	label: string
}

export interface HotelDestinationCardData {
	id: number
	title: string
	subtitle: string
	image: string
	categoryKeys: HotelHeroTabKey[]
	desktopClassName: string
}

//Offers Section Types
export interface OfferItem {
  label: string
  image: string
  spanClassName: string
}

export interface OffersSectionData {
  sectionTitle: string
  offers: OfferItem[]
}