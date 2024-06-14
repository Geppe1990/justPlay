import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { gameDetails } from "@/models/gameDetails"

interface SavedGamesState {
	games: gameDetails[]
}

const initialState: SavedGamesState = {
	games: [],
}

const savedGamesSlice = createSlice({
	name: "savedGames",
	initialState,
	reducers: {
		addGame: (state, action: PayloadAction<gameDetails>) => {
			state.games.push(action.payload)
		},
		removeGame: (state, action: PayloadAction<number>) => {
			state.games = state.games.filter((game) => game.id !== action.payload)
		},
	},
})

export const { addGame, removeGame } = savedGamesSlice.actions

export default savedGamesSlice.reducer
