import { defineComponent, h } from 'vue'
import { Icon } from '@iconify/vue'

// Iconify Icon在Vue里在线使用（用于外网环境）
export default defineComponent({
	name: 'IconifyOnlineIcon',
	components: { Icon },
	props: {
		icon: {
			type: String,
			default: ''
		}
	},
	render() {
		const attrs = this.$attrs
		return h(
			Icon,
			{
				icon: this.icon,
				style: attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' },
				...attrs
			},
			{
				default: () => []
			}
		)
	}
})
