import request from '@/utils/http/request'

export function getAsyncRoutes() {
	return request({
		url: '/getAsyncRoutes',
		method: 'get'
	})
}
