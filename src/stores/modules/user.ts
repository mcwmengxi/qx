import { defineStore } from 'pinia'
import { login } from '@/api/user'
import { removeToken, setToken, StorageSession, SessionKey } from '@/utils/auth'
import router from '@/router'
const userStore = defineStore('user', {
	// id: 'user',
	state: () => {
		return {
			username: StorageSession.getItem(SessionKey)?.username ?? '',
			// 页面级别权限
			roles: StorageSession.getItem(SessionKey)?.roles ?? []
		}
	},
	getters: {},
	actions: {
		/** 存储用户名 */
		setUserName(user: string) {
			this.username = user
		},
		/** 存储角色 */
		setRoles(role: Array<string>) {
			this.roles = role
		},
		// 登录
		async loginByUserName(data) {
			return new Promise((resolve, reject) => {
				login(data)
					.then(result => {
						resolve(result)
						setToken(result.data)
					})
					.catch((err: any) => {
						reject(err)
					})
			})
		},
		// 登出
		logout() {
			this.username = ''
			this.roles = []
			removeToken()
			router.push('login')
		}
	}
})

export default userStore
