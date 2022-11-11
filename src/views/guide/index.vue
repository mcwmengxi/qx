<template>
	<el-button type="primary" @click="open">{{ msg }}</el-button>
	<FunctionalComponent></FunctionalComponent>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import FunctionalComponent from '@/views/guide/functional-component/index.vue'
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
</script>
