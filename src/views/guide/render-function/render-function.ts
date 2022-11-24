import { h, defineComponent } from 'vue'

export default defineComponent({
	name: 'CustomCom',
	render({ $emit, $slots, $attrs }: any) {
		return h(
			'button',
			{
				style: {
					backgroundColor: 'skyblue'
				},
				onClick(e: Event) {
					$emit('custom-click')
				},
				disabled: $attrs.disabled
			},
			$slots.default()
		)
	}
})
