import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
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
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
})
