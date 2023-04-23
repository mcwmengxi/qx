<script lang="ts">
export default {
	name: 'Layout'
}
</script>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import WebCom from '@/views/WebComponents/index.vue'
import Horizontal from '@/layout/components/sidebar/horizontal.vue'
const LayoutHeader = defineComponent({
	name: 'LayoutHeader',
	render() {
		return h(
			'div',
			{ style: 'box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)' },
			{
				default: () => [h(Horizontal)]
			}
		)
	}
})
</script>

<template>
	<div class="app-wrapper">
		<div class="app-mask">
			<div class="app-container">
				<div>
					<span class="qx-test__wrapper--primary">123</span>
					<WebCom />
					<LayoutHeader />
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@include B(test) {
	text-shadow: 1ch;
	@include E(wrapper) {
		background: plum;
		@include M(primary) {
			color: greenyellow;
		}
	}
}
</style>
