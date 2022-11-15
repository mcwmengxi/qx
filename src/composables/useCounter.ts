interface UseCounterOptions {
	min?: number
	max?: number
}

/**
 * 实现计数器函数,确保功能正常工作
 * 1. 加 (+)
 * 2. 减 (-)
 * 3. 重置
 * 4. 最小值 & 最大值 选项支持
 */
import { ref, unref } from 'vue'
export default function useCounter(
	initialValue = 0,
	options: UseCounterOptions = {}
) {
	const count = ref<number>(initialValue)
	const { min, max } = options
	const inc = () => {
		count.value = max ? Math.min(unref(count.value) + 1, max) : count.value++
	}
	const dec = () => {
		// count.value = min ? Math.max(unref(count.value) - 1, min) : count.value--
		if (count.value === min) {
			count.value = min
		} else {
			count.value--
		}
	}
	const reset = () => {
		count.value = initialValue
	}
	return {
		count,
		inc,
		dec,
		reset,
	}
}
