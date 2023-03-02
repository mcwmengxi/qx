import { Component, defineComponent, h } from 'vue'
import { FontIcon, IconifyOfflineIcon, IconifyOnlineIcon, ElementPlusIcon } from '../index'
import { iconType } from './type'
export default function useRenderIcon(icon: any, attrs?: iconType): Component {
	const IconfontReg = /^iconfont-/g
	// 加上iconfont-标识
	if (IconfontReg.test(icon)) {
		// iconfont: font-class
		// <component :is="useRenderIcon('iconfont-team-iconlogo')" />
		// <!-- unicode模式，需要在图标名称最后空一格然后加上uni字符即可 -->
		// <component :is="useRenderIcon('iconfont-&#xe620; uni')" />
		// <!-- symbol模式，需要在图标名称最后空一格然后加上svg字符即可 -->
		// <component
		//   :is="
		//     useRenderIcon('iconfont-team-iconlogo svg', { width: '20px', height: '20px' })
		//   "
		// />
		const name = icon.split(IconfontReg)[1]
		const iconName = name.slice(0, name.indexOf(' ') === -1 ? name.length : name.indexOf(' '))
		const iconType = name.slice(name.indexOf(' ') + 1, name.length)
		return defineComponent({
			name: 'FontIcon',
			render() {
				return h(FontIcon, {
					icon: iconName,
					iconType: iconType,
					...attrs
				})
			}
		})
	} else if (typeof icon === 'function' || typeof icon?.render === 'function') {
		// svg方式引入,可以直接返回
		return icon
	} else if (icon.ElementPlusIcon?.name === 'ElementPlusIcon') {
		// 组件形式直接返回
		return ElementPlusIcon
	} else {
		// <!-- 本地图标模式 -->
		// <el-input :prefix-icon="useRenderIcon('user')" />
		// <!-- 在线图标模式，只需要在第二个参数加上 { online: true } 即可 -->
		// <el-input :prefix-icon="useRenderIcon('ep:camera-filled', { online: true })" />
		return defineComponent({
			name: 'IconifyIcon',
			render() {
				// const IconifyIcon = attrs.online ? IconifyOnlineIcon : IconifyOfflineIcon
				const IconifyIcon = icon.includes(':') ? IconifyOnlineIcon : IconifyOfflineIcon
				return h(IconifyIcon, {
					icon: icon,
					...attrs
				})
			}
		})
	}
}
