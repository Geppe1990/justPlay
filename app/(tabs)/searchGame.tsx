import Ionicons from "@expo/vector-icons/Ionicons"
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
	Button,
	Pressable,
	View,
	Image,
	ActivityIndicator,
	FlatList,
	ListRenderItem,
} from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useState } from "react"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { searchGame } from "@/models/searchGame"
import { styles } from "@/styles/searchGame.styles"

interface ResultsState {
	count: number
	next: string | null
	previous: string | null
	results: searchGame[]
}

type RootStackParamList = {
	gameDetails: { id: number }
}

export default function TabThreeScreen() {
	const [searchQuery, setSearchQuery] = useState("")
	const [results, setResults] = useState<ResultsState | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	const handleChangeText = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	): void => {
		setSearchQuery(e.nativeEvent.text)
	}

	const handlePress = () => {
		setIsLoading(true)
		fetchData(searchQuery)
			.then((data) => {
				setResults(data)
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setIsLoading(false)
			})
	}

	const fetchData = async (name: string, url?: string) => {
		const endpoint =
			url ||
			`https://api.rawg.io/api/games?key=644e9f79a514458c9c203f1fa7e45f30&search=${name}&exclude_stores=9`
		const response = await fetch(endpoint, {
			method: "GET",
			headers: { Accept: "application/json" },
		})
		if (!response.ok) {
			console.log("ERRORE: ", response)
		}
		return await response.json()
	}

	const fetchMoreData = () => {
		if (results?.next && !isLoadingMore) {
			setIsLoadingMore(true)
			fetchData(searchQuery, results.next)
				.then((data) => {
					setResults((prevResults) => ({
						...data,
						results: [...(prevResults?.results || []), ...data.results],
					}))
					setIsLoadingMore(false)
				})
				.catch((error) => {
					console.log(error)
					setIsLoadingMore(false)
				})
		}
	}

	const renderItem: ListRenderItem<searchGame> = ({ item }) => (
		<Pressable
			key={item.id}
			style={styles.listElement}
			onPress={() => navigation.navigate("gameDetails", { id: item.id })}
		>
			<Image source={{ uri: item.background_image }} style={styles.image} />
			<View style={styles.details}>
				<ThemedText>{item.name}</ThemedText>
				<ThemedText>Rating: {item.rating}</ThemedText>
				<ThemedText>Released: {item.released}</ThemedText>
			</View>
			<Ionicons size={22} name="chevron-forward" />
		</Pressable>
	)

	return (
		<View style={styles.container}>
			<FlatList
				data={results?.results || []}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={fetchMoreData}
				onEndReachedThreshold={0.5}
				ListHeaderComponent={
					<>
						<ThemedView style={styles.titleContainer}>
							<ThemedText type="title">Search</ThemedText>
						</ThemedView>
						<TextInput
							style={styles.input}
							onChange={handleChangeText}
							value={searchQuery}
							placeholder="Search a game by name"
							keyboardType="default"
						/>
						<Button onPress={handlePress} title="Search" />
						{isLoading && <ActivityIndicator size="large" color="#0000ff" />}
					</>
				}
				ListFooterComponent={
					isLoadingMore ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : null
				}
			/>
		</View>
	)
}
