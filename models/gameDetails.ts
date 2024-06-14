export interface gameDetails {
	id: number
	name: string
	background_image: string
	rating: number
	released: string
	metacritic: number | null
	stores: {
		store: {
			id: number
			name: string
			slug: string
		}
	}[]
	platforms: {
		platform: {
			id: number
			name: string
			slug: string
		}
	}[]
	genres: {
		id: number
		name: string
		slug: string
	}[]
}
