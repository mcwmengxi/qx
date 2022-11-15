import HelloWorldVue from '@/components/HelloWorld.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
					title: '首页',
				},
			},
		],
	},
	{
		path: '/test',
		component: () => import('@/views/TestElementPlus.vue'),
		name: 'Test',
		meta: {
			title: '测试',
		},
	},
	{
		path: '/guide',
		component: () => import('@/views/guide/index.vue'),
		name: 'Guide',
		meta: {
			title: '指南',
		},
	},
	{
		path: '/composable',
		component: () => import('@/views/composable-function/index.vue'),
		name: 'Composable',
		meta: {
			title: '可组合函数测试',
		},
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
})

export default router
