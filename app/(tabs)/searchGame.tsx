import Ionicons from "@expo/vector-icons/Ionicons"
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputChangeEventData,
	Button,
	Pressable,
	View,
	Image,
	ActivityIndicator,
} from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useState } from "react"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { searchGame } from "@/models/searchGame"

interface ResultsState {
	count: number
	results: searchGame[]
}

type RootStackParamList = {
	explore: undefined
	gameDetails: { game: searchGame }
}

export default function TabThreeScreen() {
	const [searchGame, setSearchGame] = useState("")
	const [results, setResults] = useState<ResultsState | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	const handleChangeText = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	): void => {
		setSearchGame(e.nativeEvent.text)
	}

	const handlePress = () => {
		setIsLoading(true)
		fetchData(searchGame)
			.then((data) => {
				setResults(data)
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setIsLoading(false)
			})
	}

	const fetchData = async (name: string) => {
		const endpoint: string = "https://api.rawg.io/api/games"
		const apikey: string = "644e9f79a514458c9c203f1fa7e45f30"
		const response = await fetch(
			`${endpoint}?key=${apikey}&search=${name}&exclude_stores=9`,
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
			{isLoading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				results &&
				results.results &&
				results.results.map((item) => (
					<Pressable
						key={item.id}
						style={styles.listElement}
						onPress={() => navigation.navigate("gameDetails", { game: item })}
					>
						<Image
							source={{ uri: item.background_image }}
							style={styles.image}
						/>
						<View style={styles.details}>
							<ThemedText>{item.name}</ThemedText>
							<ThemedText>Rating: {item.rating}</ThemedText>
							<ThemedText>Released: {item.released}</ThemedText>
						</View>
						<Ionicons size={22} name="chevron-forward" />
					</Pressable>
				))
			)}
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
		alignItems: "center",
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingVertical: 10,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 10,
	},
	details: {
		flex: 1,
		marginLeft: 10,
	},
})
