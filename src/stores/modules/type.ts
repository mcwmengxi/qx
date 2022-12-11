import { RouteRecordName } from 'vue-router'

export type cacheType = {
	mode: string
	name?: RouteRecordName
}
// 截取长度
export type positionType = {
	startIndex?: number
	length?: number
}
export type multiType = {
	path: string
	parentPath: string
	name: string
	meta: any
	query?: object
	params?: object
}
