<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'

const count = ref(0)

/**
 * 挑战 1: Watch 一次
 * 确保副作用函数只执行一次
 */
const stop = watch(count, () => {
	console.log('Only triggered once')
	stop()
})

count.value = 1

setTimeout(() => {
	count.value = 2
})

/**
 * 挑战 2: Watch 对象
 * 确保副作用函数被正确触发
 */
// shallowRef只有对 .value 的访问是响应式的
const state = shallowRef({
	count: 0
})

watch(
	state,
	() => {
		console.log('The state.count updated')
	},
	{
		deep: true
	}
)

// state.value.count = 2
// 通过修改.value触发响应式
state.value = { count: 2 }
/**
 * 挑战 3: 副作用函数刷新时机
 * 确保正确访问到更新后的`eleRef`值
 */

const eleRef = ref()
const age = ref(2)
// 默认情况下flush: sync，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用
// flush: post侦听器回调中能访问被 Vue 更新之后的 DOM
watch(
	age,
	() => {
		console.log(eleRef.value)
	},
	{
		flush: 'post'
	}
)
age.value = 18
</script>

<template>
	<div>
		<p>
			{{ count }}
		</p>
		<p ref="eleRef">
			{{ age }}
		</p>
	</div>
</template>
