import React from "react"
import { Text, StyleSheet, Image, ScrollView } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { ResultInterface } from "./(tabs)/search"

type GameDetailsRouteProp = RouteProp<{ params: { game: ResultInterface } }>

const GameDetails = () => {
	const route = useRoute<GameDetailsRouteProp>()
	const { game } = route.params

	return (
		<ScrollView style={styles.container}>
			<Image source={{ uri: game.background_image }} style={styles.image} />
			<Text style={styles.title}>{game.name}</Text>
			<Text style={styles.details}>Rating: {game.rating}</Text>
			<Text style={styles.details}>Released: {game.released}</Text>
			{/* Aggiungi altre informazioni se necessario */}
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
})

export default GameDetails
