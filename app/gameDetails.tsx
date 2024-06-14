import React, { useEffect, useState } from "react"
import { Text, Image, ScrollView, ActivityIndicator, View } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { gameDetails } from "@/models/gameDetails"
import { styles } from "@/styles/gameDetails.styles"
type GameDetailsRouteProp = RouteProp<{ params: { id: number } }>

const GameDetails = () => {
	const route = useRoute<GameDetailsRouteProp>()
	const { id } = route.params
	const [game, setGame] = useState<gameDetails | null>(null)
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

			{game.released && (
				<Text style={styles.details}>
					Released: {formatDate(game.released)}
				</Text>
			)}

			{/*{game.description_raw && <Text>{game.description_raw}</Text>}*/}

			{game.metacritic !== null && (
				<Text style={styles.details}>Metacritic: {game.metacritic}</Text>
			)}

			{game.stores && game.stores.length > 0 && (
				<>
					<Text style={styles.details}>Stores</Text>
					{game.stores.map(({ store }) => (
						<Text key={store.id}>{store.name}</Text>
					))}
				</>
			)}

			{game.platforms && game.platforms.length > 0 && (
				<>
					<Text style={styles.details}>Platforms</Text>
					{game.platforms.map(({ platform }) => (
						<Text key={platform.id}>{platform.name}</Text>
					))}
				</>
			)}

			{game.genres &&
				game.genres.map((genre) => (
					<Text key={genre.id}>Genre: {genre.name}</Text>
				))}
		</ScrollView>
	)
}
export default GameDetails
