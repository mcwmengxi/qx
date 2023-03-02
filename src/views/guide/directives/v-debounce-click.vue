<script setup lang="ts">
/**
 * 实现以下自定义指令
 * 确保在一定时间内当快速点击按钮多次时只触发一次点击事件
 * 你需要支持防抖延迟时间选项, 用法如 `v-debounce-click:ms`
 *
 */

const VDebounceClick = {
	created: (el, binding, vNode) => {
		console.log(el, binding, vNode)
		const { arg, value: callback } = binding
		el.addEventListener('click', debounce(callback, arg))
	}
}
function debounce(callback: Function, delay: number) {
	let timer
	let clickCount = 0
	return function () {
		clickCount++
		if (clickCount === 1) return callback()
		if (timer) clearTimeout(timer)

		timer = setTimeout(callback, delay)
	}
}

function onClick() {
	console.log('Only triggered once when clicked many times quicky')
}
</script>

<template>
	<button v-debounce-click:200="onClick">Click on it many times quickly</button>
</template>
