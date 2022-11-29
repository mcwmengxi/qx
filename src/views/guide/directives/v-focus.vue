<script setup lang="ts">
import { ref } from 'vue'

const state = ref(false)

/**
 * Implement the custom directive
 * Make sure the input element focuses/blurs when the 'state' is toggled
 *
 */

const VFocus = {
	mounted: el => {
		el.focus()
	},
	updated: (el, binding) => {
		console.log(el, binding)
		// binding.value ? el.blur() : el.focus()
		binding.value ? el.focus() : el.blur()
	}
}

setInterval(() => {
	// state.value = !state.value
}, 2000)
</script>

<template><input class="input-text" v-focus="state" type="text" /></template>
<style>
.input-text {
	border: 1px solid sandybrown;
}
</style>
