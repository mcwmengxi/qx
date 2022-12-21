import useEventListener from '@/composables/useEventListener'
import { ref, reactive } from 'vue'
export default function useMouse() {
	// const point = reactive({
	// 	x: 0,
	// 	y: 0,
	// })
	const x = ref(0)
	const y = ref(0)
	useEventListener(window, 'mousemove', (e: any) => {
		// point.x = e.clientX
		// point.y = e.clientY
		x.value = e.clientX || 0
		y.value = e.clientY || 0
		// console.log(toRaw(point))
	})
	return {
		x,
		y
	}
}
