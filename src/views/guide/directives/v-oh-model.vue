<script setup lang="ts">
import { ObjectDirective, ref } from 'vue'

const value = ref('Hello Vue.js')
/**
 * 实现以下自定义指令
 * 在表单输入元素和数据间创建双向绑定
 *
 */
const VOhModel: ObjectDirective<HTMLInputElement, string> = {
	mounted(el, binding) {
		const { value: val } = binding
		el.value = val
		el.addEventListener('input', onInput)
	},
	unmounted(el) {
		el.removeEventListener('input', onInput)
	}
}
function onInput(e: Event) {
	value.value = (<HTMLInputElement>e.target).value
}
defineExpose({
	value
})
</script>

<template><input class="input-text" v-oh-model="value" type="text" />{{ value }}</template>
<style>
.input-text {
	border: 1px solid sandybrown;
}
</style>
