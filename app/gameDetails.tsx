import { Image, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect, useState } from "react"
import { ThemedText } from "@components/ThemedText"
import ParallaxScrollView from "@components/ParallaxScrollView"
import RenderHtml from "react-native-render-html"

interface ResultsState {
	slug: string
	name: string
	background_image: string
	metacritic: number
	released: string
	description: string
}
export default function GameDetails() {
	const { gameId } = useLocalSearchParams<{ gameId: string }>()
	const navigation = useNavigation()
	const [results, setResults] = useState<ResultsState | null>(null)

	useLayoutEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				// https://api.rawg.io/api/games/{id}
				`https://api.rawg.io/api/games/${gameId}?key=${process.env.EXPO_API_KEY}`,
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

		navigation.setOptions({
			headerBackTitleVisible: false,
		})

		fetchData()
			.then((data) => setResults(data))
			.catch((error) => console.log(error))
	}, [navigation])

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<Image
					style={styles.headerImage}
					source={{
						uri: results?.background_image,
					}}
				/>
			}
		>
			{results && (
				<>
					{results.name && (
						<ThemedText type="title">{results?.name}</ThemedText>
					)}
					{results.released && (
						<>
							<ThemedText type="subtitle">
								Released: {results.released}
							</ThemedText>
						</>
					)}

					{results.description && (
						<RenderHtml source={{ html: results.description }} />
					)}

					{results.metacritic && (
						<ThemedText>Metacritic: {results.metacritic}</ThemedText>
					)}
				</>
			)}
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	headerImage: {
		height: 300,
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
})
