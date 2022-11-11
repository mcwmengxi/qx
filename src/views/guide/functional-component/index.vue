<template>
	<list-component :list="list" :active-index="activeIndex" @toggle="toggle" />
</template>
<script setup lang="ts">
import { ref, h } from 'vue'

/**
 * Implement a functional component :
 * 1. Render the list elements (ul/li) with the list data
 * 2. Change the list item text color to red when clicked.
 */
const ListComponent = (props: any, ctx: any) => {
	const { list } = props
	const { emit, slots, attrs } = ctx

	const handleClick = (index: number) => {
		emit('toggle', index)
	}
	return h(
		'ul',
		list.map((item: any, index: number) => {
			return h(
				'li',
				{
					key: index,
					style: {
						width: '200px',
						height: '40px',
						// color: 'red',
						listStyle: 'none',
						border: '1px solid red',
						backgroundColor:
							index == props['active-index'] ? '#ffffff' : '#ccc',
					},
					onClick: () => handleClick(index),
				},
				item.name
			)
		})
	)
}

const list = [
	{
		name: 'John',
	},
	{
		name: 'Doe',
	},
	{
		name: 'Smith',
	},
]

const activeIndex = ref(0)

function toggle(index: number) {
	activeIndex.value = index
}
</script>
