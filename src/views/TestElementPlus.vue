<template>
	<el-button type="primary" @click="open">{{ msg }}</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
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
</script>
