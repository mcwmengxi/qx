<script setup lang="ts">
import { ref, vModelText } from 'vue'
const value = ref('')
const oldHook = vModelText.beforeUpdate
vModelText.beforeUpdate = function (el, { value, modifiers }, vnode) {
	oldHook(...arguments)
	console.log(modifiers, el.value, value)
	console.log(vModelText)
	const { capitalize } = modifiers
	if (capitalize) {
		el.value = value.charAt(0).toUpperCase() + value.slice(1)
	}
}
</script>

<template>
	<input class="input-text" type="text" v-model.capitalize="value" />
</template>
<style>
.input-text {
	border: 1px solid sandybrown;
}
</style>
