import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { decrement, increment } from "@/reducers/counterSlice"
import { Button, Text } from "react-native"

const Counter = () => {
	const count = useSelector((state: RootState) => state.counter.value)
	const dispatch = useDispatch<AppDispatch>()
	return (
		<>
			<Text>Count: {count}</Text>
			<Button title="Increment" onPress={() => dispatch(increment())} />
			<Button title="Decrement" onPress={() => dispatch(decrement())} />
		</>
	)
}

export default Counter
