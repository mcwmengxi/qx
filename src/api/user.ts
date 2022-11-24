import request from '@/utils/http/request'
export function login(data: any): any {
	return request({
		url: '/login',
		method: 'post',
		data,
		params: {
			key: 'union'
		}
	})
}
