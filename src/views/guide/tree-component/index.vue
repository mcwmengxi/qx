<template>
	<div class="tree" v-for="item in data" :key="item.key">
		<span class="tree-title">{{ item.title }}</span>
		<template v-if="item.children && item.children.length">
			<TreeComponent :data="item.children" />
		</template>
	</div>
</template>

<script setup lang="ts">
interface TreeData {
	key: string
	title: string
	children: TreeData[]
}
defineProps<{ data: TreeData[] }>()
</script>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TreeComponent'
})
</script>
<style lang="scss">
.tree {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
}
.tree-title {
	font-size: 14px;
	color: aquamarine;
	text-align: left;
}
.tree-nodes {
	padding-left: 10px;
}
</style>
