<script setup lang="ts">
import { onMounted } from 'vue'
import * as UserService from '@/api/user'
onMounted(() => {
	UserService.login({
		name: 'admin',
		password: '123456'
	}).then((data: any) => {
		console.log(11, data)
	})
	fetch('/login?id=1', {
		method: 'post',
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => {
			return response.json()
		})
		.then(myJson => {
			console.log(myJson)
		})
})
</script>

<template>
	<el-config-provider namespace="qx">
		<RouterView />
	</el-config-provider>
</template>

<style lang="scss" scoped></style>
