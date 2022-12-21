import { ref, watchEffect } from 'vue'
export default function useLocalStorage(key: string, initialValue: any) {
	initialValue = localStorage.getItem(key) || initialValue
	const value = ref(initialValue)

	watchEffect(() => {
		localStorage.setItem(key, value.value)
	})
	return value
}
