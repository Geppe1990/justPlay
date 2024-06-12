// components/HelloWorld.tsx
import React from "react"
import { Text, View, StyleSheet } from "react-native"

const HelloWorld = () => {
	return (
		<View style={styles.container}>
			<Text>Hello World!</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
})

export default HelloWorld
