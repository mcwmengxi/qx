<template>
	<el-button type="primary" @click="open">{{ msg }}</el-button>
	<!-- <FunctionalComponent /> -->
	<!-- <RenderFunction :disabled="false" @custom-click="onClick">my button</RenderFunction> -->
	<!-- <TreeComponent :data="treeData" /> -->
	<!-- <RefFamily /> -->
	<br />
	<!-- <WritableComputed /> -->
	<br />
	<!-- <WatchFamily /> -->
	<br />
	<!-- <EffectScope /> -->
	<br />
	<!-- <CustomRef /> -->
	<br />
	<!-- <Capitalize /> -->
	<!-- <VFocus /> -->
	<!-- <VDebounceClick /> -->
	<!-- <VActiveStyle /> -->
	<!-- <VOhModel /> -->
	<hr />
	<!-- <Until /> -->
	<br />
	<ReactivityStorage />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import FunctionalComponent from '@/views/guide/functional-component/index.vue'
import RenderFunction from '@/views/guide/render-function/render-function'
import TreeComponent from '@/views/guide/tree-component/index.vue'
import { TreeData } from './tree-component/index.vue'
import RefFamily from './ref-family/ref-family.vue'
import WritableComputed from './writable-computed/writable-computed.vue'
import WatchFamily from './watch-family/watch-family.vue'
import EffectScope from './effect-scope/effect-scope.vue'
import CustomRef from './custom-ref/custom-ref.vue'
import Capitalize from './directives/capitalize.vue'
import VFocus from './directives/v-focus.vue'
import VDebounceClick from './directives/v-debounce-click.vue'
import VActiveStyle from './directives/v-active-style.vue'
import VOhModel from './directives/v-oh-model.vue'
import Until from './until/until.vue'
import ReactivityStorage from './reactivity-storage/reactivity-storage.vue'
const msg = ref('Click to open the Message Box')

const open = () => {
	ElMessageBox.alert('This is a message', 'Title', {
		// if you want to disable its autofocus
		// autofocus: false,
		confirmButtonText: 'OK',
		callback: (action: Action) => {
			ElMessage({
				type: 'info',
				message: `action: ${action}`
			})
		}
	})
}
const onClick = () => {
	console.log('onClick')
}

const treeData: any = ref([
	{
		key: '1',
		title: 'Parent 1',
		children: [
			{
				key: '1-1',
				title: 'child 1'
			},
			{
				key: '1-2',
				title: 'child 2',
				children: [
					{
						key: '1-2-1',
						title: 'grandchild 1'
					},
					{
						key: '1-2-2',
						title: 'grandchild 2'
					}
				]
			}
		]
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
						title: 'grandchild 1'
					},
					{
						key: '2-1-2',
						title: 'grandchild 2'
					}
				]
			},
			{
				key: '2-2',
				title: 'child 2'
			}
		]
	}
])
</script>
