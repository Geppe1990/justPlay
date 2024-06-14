export interface searchGame {
	name: string
	id: number
	background_image: string
	rating: number
	released: string
	metacritic: number | null
	stores: Istore[]
	platforms: Iplatform[]
	genres: {
		id: number
		name: string
		slug: string
	}[]
}

interface Istore {
	store: {
		id: number
		name: string
		slug: string
	}
}

interface Iplatform {
	platform: {
		id: number
		name: string
		slug: string
	}
}
