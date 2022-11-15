export default function useToggle(type: boolean) {
	const state = ref(type)
	const toggle = () => {
		state.value = !state.value
	}
	return [state, toggle]
}
