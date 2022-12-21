<script setup lang="ts">
import { ref } from 'vue'

import useLocalStorage from '@/composables/useLocalStorage'
const counter = useLocalStorage('counter', 0)

// 我们可以通过触发`counter`的`getter`来获取本地存储的值
console.log(counter.value)

// 同样地,我们也可以通过触发`counter`的`setter`来设置本地存储的值

// counter.value = 1
const update = () => counter.value++
</script>
<template>
	<p>Counter: {{ counter }}</p>
	<button @click="update">Update</button>
</template>
