import { h, defineComponent, resolveDirective, withDirectives, Directive } from 'vue'

export default defineComponent({
	name: 'Motion',
	props: {
		delay: {
			type: Number,
			default: 50
		}
	},
	render() {
		const { delay } = this
		const motion = resolveDirective('motion')
		return withDirectives(
			h(
				'div',
				{},
				{
					default: () => [this.$slots.default!()]
				}
			),
			[
				[
					motion as Directive,
					{
						initial: {
							opacity: 0,
							y: 100
						},
						enter: {
							opacity: 1,
							y: 0,
							transition: {
								delay
							}
						},
						delay: delay
					}
				]
			]
		)
	}
})
