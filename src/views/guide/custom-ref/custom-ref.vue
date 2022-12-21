<script setup lang="ts">
import { customRef, watch } from 'vue'

/**
 * 补全以下函数来实现防抖ref :
 */
function useDebouncedRef(value, delay = 200) {
	let timer
	return customRef((track, trigger) => {
		return {
			get() {
				track()
				return value
			},
			set(newValue) {
				clearTimeout(timer)
				timer = setTimeout(() => {
					value = newValue.trim()
					trigger()
				}, delay)
			}
		}
	})
}
const text = useDebouncedRef('hello')

/**
 * 确保在输入框快速输入时, 只触发一次回调。
 */
watch(text, value => {
	console.log(value)
})
</script>

<template>
	<input class="input-text" v-model="text" placeholder="请输入" />
</template>
<style>
.input-text {
	border: 1px solid sandybrown;
}
</style>
