export interface gameDetails {
	id: number
	slug: string
	name: string
	name_original: string
	description: string
	metacritic: number | null
	released: string
	tba: boolean
	background_image: string
	platforms: {
		platform: {
			id: number
			name: string
			slug: string
		}
	}[]
	stores: {
		store: {
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
	tags: {
		id: number
		name: string
		slug: string
		language: string
	}[]
	publishers: {
		id: number
		name: string
		slug: string
	}[]
	description_raw: string
}
