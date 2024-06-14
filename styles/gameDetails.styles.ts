import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
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
	subtitle: {
		fontSize: 20,
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
	nameWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
