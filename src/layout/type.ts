import type { IconifyIcon } from '@iconify/vue'
export interface settingType {
	sidebar: {
		opened: boolean
		withoutAnimation: boolean
		isClickCollapse: boolean
	}
	device: string
	fixedHeader: boolean
	classes: {
		hideSidebar: boolean
		openSidebar: boolean
		withoutAnimation: boolean
		mobile: boolean
	}
	hideTabs: boolean
}
export type routeMetaType = {
	title?: string
	icon?: string | IconifyIcon
	showLink?: boolean
	savedPosition?: boolean
	auths?: Array<string>
}
export type RouteConfigs = {
	path?: string
	parentPath?: string
	query?: object
	params?: object
	meta?: routeMetaType
	children?: RouteConfigs[]
	name?: string
}
export const routerArrays: Array<RouteConfigs> = [
	{
		path: '/welcome',
		parentPath: '/',
		meta: {
			title: '首页',
			icon: 'homeFilled'
		}
	}
]
