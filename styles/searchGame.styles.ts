import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
		padding: 16,
	},
	input: {
		height: 40,
		marginVertical: 12,
		marginHorizontal: 16,
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
		paddingHorizontal: 16,
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
