const testRouter = {
	path: '/test',
	component: () => import('@/views/TestElementPlus.vue'),
	name: 'Test',
	meta: {
		title: '测试'
	}
} as RouteConfigsTable
export default testRouter
