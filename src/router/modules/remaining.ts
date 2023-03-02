const Layout = () => import('@/layout/index.vue')

export default [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
			showLink: false,
			rank: 101
		}
	},
	// {
	// 	path: '/',
	// 	name: 'Index',
	// 	component: HelloWorldVue,
	// 	redirect: '/index',
	// 	children: [
	// 		{
	// 			path: 'index',
	// 			component: () => import('@/views/Home.vue'),
	// 			name: 'Home',
	// 			meta: {
	// 				title: '首页'
	// 			}
	// 		}
	// 	]
	// },
	{
		path: '/layout',
		component: Layout,
		name: 'Layout',
		redirect: '/layout/test',
		children: [
			{
				path: 'test',
				name: 'TestLayout',
				component: () => import('@/views/TestLayout.vue'),
				meta: {
					title: '首页1',
					showLink: false,
					rank: 104
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
	},
	{
		path: '/redirect',
		component: Layout,
		meta: {
			icon: 'home-filled',
			title: '首页',
			showLink: false,
			rank: 104
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				name: 'Redirect',
				component: () => import('@/layout/redirect.vue')
			}
		]
	}
] as Array<RouteConfigsTable>
