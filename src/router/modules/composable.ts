const composableRouter = {
	path: '/composable',
	component: () => import('@/views/composable-function/index.vue'),
	name: 'Composable',
	meta: {
		title: '可组合函数测试'
	}
} as RouteConfigsTable

export default composableRouter
