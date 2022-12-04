import { getConfig } from '@/config'
import { buildHierarchyTree } from '@/utils/tree'
import { loadEnv } from '@build/index'
import { cloneDeep, intersection, reject } from 'lodash-unified'
import {
	createWebHashHistory,
	createWebHistory,
	type RouteRecordNormalized,
	RouteRecordRaw,
	RouterHistory,
	type RouteComponent
} from 'vue-router'

import { DataInfo, SessionKey, StorageSession } from '@/utils/auth'
import permissionStore, { usePermissionStoreHook } from '@/stores/modules/permission'
import { useTimeoutFn } from '@vueuse/core'
import { getAsyncRoutes } from '@/api/routes'
import router from '.'
const IFrame = () => import('@/layout/frame.vue')

// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob('/src/views/**/*.{vue,tsx}')

/** 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html */
function getHistoryMode(): RouterHistory {
	const routerHistory = loadEnv().VITE_ROUTER_HISTORY
	// len为1 代表只有历史模式 为2 代表历史模式中存在base参数 https://next.router.vuejs.org/zh/api/#%E5%8F%82%E6%95%B0-1
	const historyMode = routerHistory.split(',')
	const leftMode = historyMode[0]
	const rightMode = historyMode[1]
	// no param
	if (historyMode.length === 1) {
		if (leftMode === 'hash') {
			return createWebHashHistory('')
		} else if (leftMode === 'h5') {
			return createWebHistory('')
		}
	} //has param
	else if (historyMode.length === 2) {
		if (leftMode === 'hash') {
			return createWebHashHistory(rightMode)
		} else if (leftMode === 'h5') {
			return createWebHistory(rightMode)
		}
	}
}

type orderType = 'ascending' | 'descending'
/**
 *
 * @param routes 要排序的对象数组
 * @param order 排序方式
 */
function sortRoutes(routes: any[], order: orderType = 'ascending') {
	routes.forEach(route => {
		if (route?.meta?.rank === null) route.meta.rank = undefined
		if (route?.meta?.rank === 0) {
			if (route?.name !== 'Home' && route?.path !== '/') {
				console.warn('rank only the home page can be 0')
			}
		}
	})
	if (order === 'ascending') {
		return routes.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
			return a?.meta?.rank - b?.meta?.rank
		})
	} else {
		return routes.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
			return b?.meta?.rank - a?.meta?.rank
		})
	}
}

/**
 * 将多级嵌套路由处理成一维数组,处理后的数组根据tree处理的结果区分几级菜单
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
	if (routesList.length === 0) return routesList
	let hierarchyList = buildHierarchyTree(routesList)
	for (let i = 0; i < hierarchyList.length; i++) {
		if (hierarchyList[i].children) {
			hierarchyList = hierarchyList.slice(0, i + 1).concat(hierarchyList[i].children, hierarchyList.slice(i + 1))
		}
	}
	return hierarchyList
}
/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * 该函数必须依赖于path:'/'的路由显式定义,否则会返回一个空路由数组
 * https://github.com/xiaoxian521/vue-pure-admin/issues/67
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */

function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
	if (routesList.length === 0) return routesList
	const formatRoutes: RouteRecordRaw[] = []

	routesList.forEach(route => {
		if (route.path === '/') {
			formatRoutes.push({
				component: route.component,
				name: route.name,
				path: route.path,
				redirect: route.redirect,
				meta: route.meta,
				children: []
			})
		} else {
			formatRoutes[0]?.children.push({ ...route })
		}
	})
	return formatRoutes
}

/** 处理缓存路由（添加、删除、刷新） */
function handleAliveRoute(matched: RouteRecordNormalized[], mode?: string) {
	switch (mode) {
		case 'add':
			matched.forEach(v => usePermissionStoreHook().cacheOperate({ mode: 'add', name: v.name }))
			break
		case 'delete':
			usePermissionStoreHook().cacheOperate({ mode: 'delete', name: matched[matched.length - 1].name })
			break
		default:
			usePermissionStoreHook().cacheOperate({ mode: 'delete', name: matched[matched.length - 1].name })
			useTimeoutFn(() => {
				matched.forEach(v => usePermissionStoreHook().cacheOperate({ mode: 'add', name: v.name }))
			}, 100)
			break
	}
}

/** 过滤meta中showLink为false的菜单 */
function filterTree(data: RouteComponent[]) {
	const newTree = cloneDeep(data).filter((v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false)
	newTree.forEach((v: { children }) => v.children && (v.children = filterTree(v.children)))
	return newTree
}

/** 过滤children长度为0的的目录，当目录下没有菜单时，会过滤此目录，目录没有赋予roles权限，当目录下只要有一个菜单有显示权限，那么此目录就会显示 */
function filterChildrenTree(data: RouteComponent[]) {
	const newTree = cloneDeep(data).filter((v: any) => v?.children?.length !== 0)
	newTree.forEach((v: { children }) => v.children && (v.children = filterTree(v.children)))
	return newTree
}

/** 从sessionStorage里取出当前登陆用户的角色roles，过滤无权限的菜单 */
function filterNoPermissionTree(data: RouteComponent[]) {
	const roles = StorageSession.getItem(SessionKey)?.roles ?? []
	const newTree = cloneDeep(data).filter((v: { meta: { roles: Array<string> } }) => isOneOfArray(v?.meta?.roles, roles))
	newTree.forEach((v: any) => v.children && (v.children = filterNoPermissionTree(v.children)))
	return filterChildrenTree(newTree)
}
/** 判断两个数组彼此是否存在相同值 */
function isOneOfArray(a: Array<string>, b: Array<string>) {
	//给定数组的交集
	// _.intersection([2, 1], [4, 2], [1, 2]);
	// => [2]
	return Array.isArray(a) && Array.isArray(b) ? (intersection(a, b).length > 0 ? true : false) : true
}

/** 过滤后端传来的动态路由 重新生成规范路由 */
function addAsyncRoutes(routes: Array<RouteRecordRaw>) {
	if (!routes || !routes.length) return
	const modulesRoutesKeys = Object.keys(modulesRoutes)
	routes.forEach((v: RouteRecordRaw) => {
		// 将backstage属性加入meta，标识此路由为后端返回路由
		v.meta.backstage = true
		// 父级的redirect属性取值：如果子级存在且父级的redirect属性不存在，默认取第一个子级的path；如果子级存在且父级的redirect属性存在，取存在的redirect属性，会覆盖默认值
		if (v?.children && v.children.length && !v.redirect) v.redirect = v.children[0].path
		// 父级的name属性取值：如果子级存在且父级的name属性不存在，默认取第一个子级的name；如果子级存在且父级的name属性存在，取存在的name属性，会覆盖默认值（注意：测试中发现父级的name不能和子级name重复，如果重复会造成重定向无效（跳转404），所以这里给父级的name起名的时候后面会自动加上`Parent`，避免重复）
		if (v?.children && v.children.length && !v.name) v.name = (v.children[0].name as string) + 'Parent'
		if (v.meta?.frameSrc) {
			v.component = IFrame
		} else {
			// 对后端传component组件路径和不传做兼容（如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会跟path保持一致）
			const index = v?.component
				? modulesRoutesKeys.findIndex(ev => ev.includes(v.component as any))
				: modulesRoutesKeys.findIndex(ev => ev.includes(v.path))
			v.component = modulesRoutes[modulesRoutesKeys[index]]
		}
		if (v?.children && v.children.length) {
			addAsyncRoutes(v.children)
		}
	})
	return routes
}
function addPathMatch() {
	if (!router.hasRoute('pathMatch')) {
		router.addRoute({
			path: '/:pathMatch(.*)',
			name: 'pathMatch',
			redirect: '/error/404'
		})
	}
}

/** 处理动态路由（后端返回的路由） */
function handleAsyncRoutes(routeList) {
	if (routeList.length === 0) {
		usePermissionStoreHook().handleWholeMenus(routeList)
	} else {
		formatFlatteningRoutes(addAsyncRoutes(routeList)).map((v: RouteRecordRaw) => {
			// 防止重复添加路由
			if (router.options.routes[0].children.findIndex(value => value.path === v.path) !== -1) {
				return
			} else {
				// 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
				router.options.routes[0].children.push(v)
				// 最终路由进行升序
				sortRoutes(router.options.routes[0].children)
				if (!router.hasRoute(v?.name)) router.addRoute(v)
				const flattenRouters: any = router.getRoutes().find(n => n.path === '/')
				router.addRoute(flattenRouters)
			}
		})
		usePermissionStoreHook().handleWholeMenus(routeList)
	}
	addPathMatch()
}
/** 初始化路由（`new Promise` 写法防止在异步请求中造成无限循环）*/
function initRouter() {
	if (getConfig()?.CachingAsyncRoutes) {
		// 开启动态路由缓存本地sessionStorage
		const key = 'async-routes'
		const asyncRouteList = StorageSession.getItem(key) as any
		if (asyncRouteList && asyncRouteList?.length > 0) {
			return new Promise(resolve => {
				handleAsyncRoutes(asyncRouteList)
				resolve(router)
			})
		} else {
			return new Promise(resolve => {
				getAsyncRoutes().then(({ data }) => {
					handleAsyncRoutes(data)
					StorageSession.setItem(key, data)
					resolve(router)
				})
			})
		}
	} else {
		return new Promise(resolve => {
			getAsyncRoutes().then(({ data }) => {
				handleAsyncRoutes(data)
				resolve(router)
			})
		})
	}
}
export {
	getHistoryMode,
	sortRoutes,
	formatFlatteningRoutes,
	formatTwoStageRoutes,
	filterTree,
	filterNoPermissionTree,
	handleAliveRoute,
	isOneOfArray,
	initRouter
}
