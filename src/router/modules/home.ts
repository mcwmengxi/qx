import HelloWorldVue from '@/components/HelloWorld.vue'
const homeRouter = {
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
} as RouteConfigsTable

// export { homeRouter, testRouter, loginRouter, guiderRouter, composableRouter }
export default homeRouter
