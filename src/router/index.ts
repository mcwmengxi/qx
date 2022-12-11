import { createRouter, createWebHashHistory, RouteComponent, RouteMeta, Router, RouteRecordName } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import {
	sortRoutes,
	formatFlatteningRoutes,
	formatTwoStageRoutes,
	handleAliveRoute,
	isOneOfArray,
	initRouter,
	findRouteByPath
} from './util'
import { buildHierarchyTree } from '@/utils/tree'
import NProgress from '@/plugins/nprogress'
import remainingRouter from './modules/remaining'
import { SessionKey, StorageSession } from '@/utils/auth'
import { isUrl, openLink } from '@/utils/helper'
import { getConfig } from '@/config'
import permissionStore, { usePermissionStoreHook } from '@/stores/modules/permission'
import { useMultiTagsStore } from '@/stores/modules/multiTags'
import { findIndex } from 'lodash-unified'
/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts', '!./modules/**/remaining.ts'], {
	eager: true
})

/** 原始静态路由（未做任何处理） */
const routes = []

Object.keys(modules).forEach(key => {
	routes.push(modules[key].default)
})
console.log('原始静态路由', routes, formatTwoStageRoutes(formatFlatteningRoutes(buildHierarchyTree(sortRoutes(routes)))))

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(formatFlatteningRoutes(buildHierarchyTree(sortRoutes(routes))))

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = sortRoutes(routes).concat(...remainingRouter)

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes.concat(...routes),
	strict: true,
	scrollBehavior(to, from, savedPosition) {
		return new Promise(resolve => {
			if (savedPosition) {
				return savedPosition
			} else {
				if (from.meta.saveSrollTop) {
					const top: number = document.documentElement.scrollTop || document.body.scrollTop
					resolve({ left: 0, top })
				}
			}
		})
	}
})

/** 路由白名单 */
const whiteList = ['/login']
router.beforeEach((to: toRouteType, form, next) => {
	const $permission = permissionStore()
	if (to.meta?.keepAlive) {
		const matched = to.matched
		handleAliveRoute(matched, 'add')
		// 页面整体刷新和点击标签页刷新
		if (form.name === undefined || form.name === 'Redirect') {
			handleAliveRoute(matched)
		}
	}

	// 获取session信息
	const userInfo = StorageSession.getItem(SessionKey)
	NProgress.start()
	// 外链
	const externalLink = isUrl(to?.name as string)
	if (!externalLink) {
		to.matched.some(item => {
			if (!item.meta.title) return ''
			const Title = getConfig().Title
			if (Title) document.title = `${item.meta.title} | ${Title}`
			else document.title = item.meta.title as string
		})
	}
	/** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
	function toCorrectRoute() {
		whiteList.includes(to.fullPath) ? next(form.fullPath) : next()
	}
	if (userInfo) {
		// 无权限跳转403页面
		if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo.roles)) {
			next({ path: '/error/403' })
		}
		if (form?.name) {
			// name为超链接
			if (externalLink) {
				openLink(form.name as string)
				NProgress.done()
			} else {
				toCorrectRoute()
			}
		} else {
			// 刷新
			if ($permission.wholeMenus.length === 0 && to.path !== 'login') {
				initRouter().then((router: Router) => {
					if (!useMultiTagsStore().getMultiTagsCache) {
						const handleTag = (path: string, parentPath?: string, name?: RouteRecordName, meta?: RouteMeta): void => {
							useMultiTagsStore().handleTags('push', {
								path,
								parentPath,
								name,
								meta
							})
						}
						const index = findIndex(remainingRouter, v => {
							return v.path == to.path
						})
						const routes: any = index === -1 ? router.options.routes[0].children : router.options.routes
						const route = findRouteByPath(to.path, routes)
						// query、params模式路由传参数的标签页不在此处处理
						handleTag(route.path, null, route.name, route.meta)
					}
					router.push(to.fullPath)
				})
			}
			toCorrectRoute()
		}
	} else {
		// debugger
		if (to.path !== 'login') {
			if (whiteList.indexOf(to.path) !== -1) {
				// 白名单
				next()
			} else {
				next({ path: '/login' })
			}
		} else {
			next()
		}
	}
})
router.afterEach(() => {
	NProgress.done()
})
export default router
