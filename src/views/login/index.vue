<template>
	<div class="">
		<el-form
			:label-position="labelPosition"
			label-width="100px"
			:model="loginInfo"
			style="max-width: 460px"
		>
			<Motion :delay="10">
				<el-form-item label="用户名">
					<el-input v-model="loginInfo.username" />
				</el-form-item>
			</Motion>
			<el-form-item label="密码">
				<el-input v-model="loginInfo.password" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Motion from './helper/motion'
const labelPosition = ref('right')

const loginInfo = reactive({
	username: '',
	password: ''
})
</script>

<style scoped></style>
