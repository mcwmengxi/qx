import request from '@/utils/http/request'

export function getAsyncRoutes(): any {
	return request({
		url: '/getAsyncRoutes',
		method: 'get'
	})
}
