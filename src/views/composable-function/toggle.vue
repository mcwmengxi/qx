<script setup lang="ts">
import useToggle from '@/composables/useToggle'

// import { useToggle } from '@vueuse/core'

const [state, toggle]: any = useToggle(false)
</script>

<template>
	<p>State: {{ state ? 'ON' : 'OFF' }}</p>
	<p @click="toggle">Toggle state</p>
	<p @click="() => (state = true)">Toggle state ==> true</p>
</template>
