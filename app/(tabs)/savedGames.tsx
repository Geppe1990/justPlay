import React from "react"
import {
	View,
	FlatList,
	Text,
	Pressable,
	Image,
	ListRenderItem,
} from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { styles } from "@/styles/savedGames.styles"
import { gameDetails } from "@/models/gameDetails"

type RootStackParamList = {
	gameDetails: { id: number }
}
const SavedGamesScreen = () => {
	const savedGames = useSelector((state: RootState) => state.savedGames.games)
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	const renderItem: ListRenderItem<gameDetails> = ({ item }) => (
		<Pressable
			style={styles.listElement}
			onPress={() => navigation.navigate("gameDetails", { id: item.id })}
		>
			<Image source={{ uri: item.background_image }} style={styles.image} />
			<View style={styles.details}>
				<Text style={styles.title}>{item.name}</Text>
				<Text>Rating: {item.rating}</Text>
				<Text>Released: {item.released}</Text>
			</View>
		</Pressable>
	)

	return (
		<View style={styles.container}>
			<FlatList
				data={savedGames}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={<Text>No saved games.</Text>}
			/>
		</View>
	)
}

export default SavedGamesScreen
