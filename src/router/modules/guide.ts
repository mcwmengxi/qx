const guiderRouter = {
	path: '/guide',
	component: () => import('@/views/guide/index.vue'),
	name: 'Guide',
	meta: {
		title: '指南'
	}
} as RouteConfigsTable

export default guiderRouter
