<template>
	<div class="test">test</div>
	<qx-test :userInfo="JSON.stringify(params)" />
</template>

<script setup lang="ts">
import { defineCustomElement } from 'vue'
import QxTest from './qx-test.vue'
const params = { name: 'nangong', age: 26 }
const Element = defineCustomElement(QxTest)
// 注册自定义元素
window.customElements.define('qx-test', Element)
</script>
<style scoped>
.test {
	color: red !important;
}
</style>
