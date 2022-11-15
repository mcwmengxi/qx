<template>
	<el-button type="primary" @click="open">{{ msg }}</el-button>
	<FunctionalComponent></FunctionalComponent>
	<RenderFunction :disabled="false" @custom-click="onClick"
		>my button</RenderFunction
	>
	<TreeComponent :data="treeData" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import FunctionalComponent from '@/views/guide/functional-component/index.vue'
import RenderFunction from '@/views/guide/render-function/render-function'
import TreeComponent from '@/views/guide/tree-component/index.vue'

const msg = ref('Click to open the Message Box')

const open = () => {
	ElMessageBox.alert('This is a message', 'Title', {
		// if you want to disable its autofocus
		// autofocus: false,
		confirmButtonText: 'OK',
		callback: (action: typeof Action) => {
			ElMessage({
				type: 'info',
				message: `action: ${action}`,
			})
		},
	})
}
const onClick = () => {
	console.log('onClick')
}

const treeData = ref([
	{
		key: '1',
		title: 'Parent 1',
		children: [
			{
				key: '1-1',
				title: 'child 1',
			},
			{
				key: '1-2',
				title: 'child 2',
				children: [
					{
						key: '1-2-1',
						title: 'grandchild 1',
					},
					{
						key: '1-2-2',
						title: 'grandchild 2',
					},
				],
			},
		],
	},
	{
		key: '2',
		title: 'Parent 2',
		children: [
			{
				key: '2-1',
				title: 'child 1',
				children: [
					{
						key: '2-1-1',
						title: 'grandchild 1',
					},
					{
						key: '2-1-2',
						title: 'grandchild 2',
					},
				],
			},
			{
				key: '2-2',
				title: 'child 2',
			},
		],
	},
])
</script>
