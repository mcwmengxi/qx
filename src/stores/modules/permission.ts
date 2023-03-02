import { defineStore } from 'pinia'
import { constantMenus } from '@/router'
import { cacheType } from './type'
import { sortRoutes, filterTree, filterNoPermissionTree } from '@/router/util'
import pinia from '@/stores'

const permissionStore = defineStore({
	id: 'permission',
	state: () => {
		return {
			// 静态路由生成的菜单
			constantMenus,
			// 整体路由生成的菜单（静态、动态）
			wholeMenus: [],
			// 缓存页面keepAlive
			cachePageList: []
		}
	},
	getters: {},
	actions: {
		/** 组装整体路由生成的菜单 */
		handleWholeMenus(routes: any[]) {
			this.wholeMenus = filterNoPermissionTree(filterTree(sortRoutes(this.constantMenus.concat(routes))))
		},
		cacheOperate({ mode, name }: cacheType) {
			switch (mode) {
				case 'add':
					this.cachePageList.push(name)
					this.cachePageList = [...new Set(this.cachePageList)]
					break
				case 'delete': {
					// 使用花括号将代码块确定具体的作用域
					const delIndex = this.cachePageList.findIndex(v => v === name)
					delIndex !== -1 && this.cachePageList.splice(delIndex, 1)
					break
				}
			}
		},
		/** 清空缓存页面 */
		clearAllCachePage() {
			this.wholeMenus = []
			this.cachePageList = []
		}
	}
})
export default permissionStore
export function usePermissionStoreHook() {
	return permissionStore(pinia)
}
