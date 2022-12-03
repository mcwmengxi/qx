import Cookies from 'js-cookie'
import userStore from '@/stores/modules/user'

export const SessionKey = 'user-info'
export const TokenKey = 'authorized-token'

export interface DataInfo<T> {
	/** token */
	accessToken: string
	/** `accessToken`的过期时间（时间戳） */
	expires: T
	/** 用于调用刷新accessToken的接口时所需的token */
	refreshToken: string
	/** 用户名 */
	username?: string
	/** 当前登陆用户的角色 */
	roles?: Array<string>
}

export function getToken(): DataInfo<number> {
	//  此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
	return Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : StorageSession.getItem(SessionKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(tokenInfo: DataInfo<Date>) {
	let expiresTime = 0 //过期时间
	const { accessToken, refreshToken, expires } = tokenInfo
	// 如果后端直接设置时间戳，将此处代码改为expiresTime = expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
	expiresTime = new Date(expires).getTime()
	const cookieString = JSON.stringify({ accessToken, expires })
	expiresTime > 0
		? Cookies.set(TokenKey, cookieString, { expires: (expiresTime - Date.now()) / 86400000 })
		: Cookies.set(TokenKey, cookieString)

	function setSession(username: string, roles: string[]) {
		// const { setUserName, setRoles } = userStore()
		const $user = userStore()
		$user.setUserName(username)
		$user.setRoles(roles)
		StorageSession.setItem(SessionKey, {
			refreshToken,
			expires,
			username,
			roles
		})
	}
	// session信息
	if (tokenInfo.username && tokenInfo.roles) {
		setSession(tokenInfo.username, tokenInfo.roles)
	} else {
		const username = StorageSession.getItem(SessionKey)?.username ?? ''
		const roles = StorageSession.getItem(SessionKey)?.roles ?? []
		setSession(username, roles)
	}
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
	Cookies.remove(TokenKey)
	sessionStorage.removeItem(SessionKey)
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
	return 'Bearer ' + token
}

export class StorageSession {
	static getItem(key: string): DataInfo<number> {
		return JSON.parse(sessionStorage.getItem(key))
	}
	static setItem(key, val) {
		sessionStorage.setItem(key, JSON.stringify(val))
	}
	static removeItem(key) {
		sessionStorage.removeItem(key)
	}
	static clear() {
		sessionStorage.clear()
	}
}
