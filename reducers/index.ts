import { combineReducers } from "redux"
import counterReducer from "./counterSlice"
import savedGamesReducer from "@/reducers/savedGamesSlice"

const rootReducer = combineReducers({
	counter: counterReducer,
	savedGames: savedGamesReducer,
})

export default rootReducer
