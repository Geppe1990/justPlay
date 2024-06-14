import React, { useEffect, useState } from "react"
import {
	Text,
	StyleSheet,
	Image,
	ScrollView,
	ActivityIndicator,
	View,
} from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { ResultInterface } from "./(tabs)/searchGame"

type GameDetailsRouteProp = RouteProp<{ params: { game: ResultInterface } }>

const GameDetails = () => {
	const route = useRoute<GameDetailsRouteProp>()
	const { id } = route.params.game
	const [game, setGame] = useState<ResultInterface | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchGameDetails = async () => {
			const endpoint = `https://api.rawg.io/api/games/${id}`
			const apikey = "644e9f79a514458c9c203f1fa7e45f30"
			try {
				const response = await fetch(`${endpoint}?key=${apikey}`, {
					method: "GET",
					headers: { Accept: "application/json" },
				})
				const data = await response.json()
				setGame(data)
			} catch (error) {
				console.error("Error fetching game details:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchGameDetails()
	}, [id])

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	if (!game) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.errorText}>Game details not found.</Text>
			</View>
		)
	}

	return (
		<ScrollView style={styles.container}>
			{game.background_image && (
				<Image source={{ uri: game.background_image }} style={styles.image} />
			)}

			{game.name && <Text style={styles.title}>{game.name}</Text>}
			{/*{game.description && (*/}
			{/*	<Text style={styles.details}>{game.description}</Text>*/}
			{/*)}*/}

			{game.released && (
				<Text style={styles.details}>
					Released: {formatDate(game.released)}
				</Text>
			)}

			{game.metacritic !== null && (
				<Text style={styles.details}>Metacritic: {game.metacritic}</Text>
			)}

			{game.stores &&
				game.stores.map(({ store }) => (
					<Text key={store.id}>
						Store: {store.name}[{store.id}]
					</Text>
				))}
			{game.platforms &&
				game.platforms.map(({ platform }) => (
					<Text key={platform.id}>Platform: {platform.name}</Text>
				))}
			{game.genres &&
				game.genres.map((genre) => (
					<Text key={genre.id}>Genre: {genre.name}</Text>
				))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	details: {
		fontSize: 18,
		marginBottom: 5,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		color: "red",
	},
})

export default GameDetails
