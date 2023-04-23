<template>
	<div class="test">web components test</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	userInfo: any
}>()
console.log(props)
</script>

<!-- <script>
export default defineComponent({
	name: 'qx-test'
})
</script> -->
<style lang="scss">
.test {
	color: #545456 !important;
}
</style>
