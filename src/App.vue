<script setup lang="ts">
onMounted(() => {
	fetch('/api/login', {
		method: 'post',
		headers: {
			'content-type': 'application/json',
		},
	})
		.then((response) => {
			return response.json()
		})
		.then((myJson) => {
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
