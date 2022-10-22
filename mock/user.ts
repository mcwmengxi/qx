import { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/api/get',
		method: 'get',
		response: ({ query }) => {
			return {
				code: 0,
				data: {
					name: 'qx',
					avatar: '',
				},
			}
		},
	},
	{
		url: '/api/login',
		method: 'post',
		timeout: 2000,
		response: {
			code: 200,
			data: {
				name: 'qx',
			},
		},
	},
	{
		url: '/api/text',
		method: 'post',
		rawResponse: async (req, res) => {
			let reqbody = ''
			await new Promise((resolve) => {
				req.on('data', (chunk) => {
					reqbody += chunk
				})
				req.on('end', () => resolve(undefined))
			})
			res.setHeader('Content-Type', 'text/plain')
			res.statusCode = 200
			res.end(`hello, ${reqbody}`)
		},
	},
] as MockMethod[]
