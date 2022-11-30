import HelloWorldVue from '@/components/HelloWorld.vue'
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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

const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Index',
		component: HelloWorldVue,
		redirect: '/index',
		children: [
			{
				path: 'index',
				component: () => import('@/views/Home.vue'),
				name: 'Home',
				meta: {
					title: '首页'
				}
			}
		]
	},
	{
		path: '/test',
		component: () => import('@/views/TestElementPlus.vue'),
		name: 'Test',
		meta: {
			title: '测试'
		}
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'Login',
		meta: {
			title: '登录'
		}
	},
	{
		path: '/guide',
		component: () => import('@/views/guide/index.vue'),
		name: 'Guide',
		meta: {
			title: '指南'
		}
	},
	{
		path: '/composable',
		component: () => import('@/views/composable-function/index.vue'),
		name: 'Composable',
		meta: {
			title: '可组合函数测试'
		}
	}
]

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes.concat(...routes)
})

export default router
