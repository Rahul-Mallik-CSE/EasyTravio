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
	featuredLabel?: string
	desktopClassName: string
}
