import Ionicons from "@expo/vector-icons/Ionicons"
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputChangeEventData,
	Button,
	Pressable,
	View,
} from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useState } from "react"
import { useNavigation, NavigationProp } from "@react-navigation/native"
// import GameDetails from "@components/GameDetails" // Importa NavigationProp

export interface ResultInterface {
	name: string
	id: number
}

interface ResultsState {
	count: number
	results: ResultInterface[]
}

type RootStackParamList = {
	explore: undefined
	gameDetails: { gameId: number }
}

export default function TabThreeScreen() {
	const [searchGame, setSearchGame] = useState("")
	const [results, setResults] = useState<ResultsState | null>(null)
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	const handleChangeText = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	): void => {
		setSearchGame(e.nativeEvent.text)
	}

	const handlePress = () => {
		fetchData(searchGame)
			.then((data) => setResults(data))
			.catch((error) => console.log(error))
	}

	const fetchData = async (name: string) => {
		const response = await fetch(
			`https://api.rawg.io/api/games?key=${process.env.EXPO_API_KEY}&search=${name}`,
			{
				method: "GET",
				headers: { Accept: "application/json" },
			}
		)
		if (!response.ok) {
			console.log("ERRORE: ", response)
		}

		return await response.json()
	}

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<Ionicons size={310} name="search" style={styles.headerImage} />
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Search</ThemedText>
			</ThemedView>
			<TextInput
				style={styles.input}
				onChange={handleChangeText}
				value={searchGame}
				placeholder="Search a game by name"
				keyboardType="default"
			/>
			<Button onPress={handlePress} title="Search" />
			{results &&
				results.results.map((item) => (
					<View key={item.name} style={styles.listElement}>
						<ThemedText>{item.name}</ThemedText>
						<Pressable
							onPress={() =>
								navigation.navigate("gameDetails", { gameId: item.id })
							}
						>
							<Ionicons size={22} name="chevron-forward" />
						</Pressable>
					</View>
				))}
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
	input: {
		height: 40,
		marginVertical: 12,
		marginHorizontal: 0,
		borderWidth: 1,
		padding: 10,
	},
	listElement: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 10,
	},
})
