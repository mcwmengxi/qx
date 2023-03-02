<script setup lang="ts">
import { ref, Ref, reactive, isRef, toRaw, unref, toRef, toRefs } from 'vue'

const initial = ref(10)
// const count = ref(0)

// 挑战 1: 更新 ref
// function update(value) {
// 	// 实现...
// 	count.value = value
// }
function useCount() {
	const value = reactive({
		count: 0
	})
	function updateValue(val: number) {
		// 实现...
		value.count = val
		console.log(value)
	}
	// 解构不丢失响应式
	// toRefs 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的
	return {
		state: toRefs(value),
		update: updateValue
	}
}
const {
	state: { count },
	update
} = useCount()
/**
 * 挑战 2: 检查`count`是否为一个 ref 对象
 * 确保以下输出为1
 */
console.log(
	// impl ? 1 : 0
	isRef(count) ? 1 : 0
)

/**
 * 挑战 3: 如果参数是一个 ref，则返回内部值，否则返回参数本身
 * 确保以下输出为true
 */
function initialCount(value: number | Ref<number>) {
	// 确保以下输出为true
	if (isRef(value)) value = unref(value)
	console.log('Unwrap ref', value === 10)
}

initialCount(initial)

/**
 * 挑战 4:
 * 为源响应式对象上的某个 `property` 新创建一个 `ref`。
 * 然后,`ref` 可以被传递，它会保持对其源`property`的响应式连接。
 * 确保以下输出为true
 */
const state = reactive({
	foo: 1,
	bar: 2
})
const fooRef = ref(toRef(state, 'foo')) // 修改这里的实现...

// 修改引用将更新原引用
fooRef.value++
console.log('toRef', state.foo === 2)

// 修改原引用也会更新`ref`
state.foo++
console.log('toRef', fooRef.value === 3)
</script>

<template>
	<div>
		<h1>msg</h1>
		<p>
			<span @click="update(count - 1)">-</span>
			{{ count }}
			<span @click="update(count + 1)">+</span>
		</p>
	</div>
</template>
