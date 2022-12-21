const loginRouter = {
	path: '/login',
	component: () => import('@/views/login/index.vue'),
	name: 'Login',
	meta: {
		title: '登录'
	}
} as RouteConfigsTable

export default loginRouter
