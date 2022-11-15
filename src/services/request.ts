import axios from 'axios'
import { ElMessage } from 'element-plus'
import pinia from '@/stores'
import loadStore from '@/stores/modules/load'
import { type } from 'os'

const $loadStore = loadStore(pinia)
type HttpInstance = {
  option: Object,
  intercept: boolean,
  slicence: boolean
}
class Http {
	constructor(option:any) {
		this.option = option || {}
		// 是否拦截
		this.intercept = this.option.intercept === true
		// 是否静默请求
		this.silence = this.option.silence === true
		// 注册axios
		this.init()
		return this.connect()
	}

	init() {
		// 创建axios实例
		// 静默请求不记录到内存
		if (!this.silence) {
			$loadStore.requestHandle('start')
		}
		this.service = axios.create({
			BASE_URL: process.env.BASE_API, // api的base_url
			timeout: 300000, // 请求超时时间
			withCredentials: true, // 允许携带cookie
			headers: {
				'Content-Type': 'application/json',
			},
		})

		// 拦截请求
		this.service.interceptors.response.use(
			(response) => {
				this.stopConnectStatus()
				if (this.intercept) {
					if (response.data.statusCode === 1) {
						return response.data
					} else {
						this.errorHandle(response.data.message || '请求发生错误')
					}
				}
				return response.data
			},
			(error) => {
				this.stopConnectStatus()
				// 如果接口是静默处理错误信息，则直接将错误信息全部返回出去
				if (error.config.errorSilence) {
					return Promise.reject(error)
				}
				console.log('err' + error) // for debug
				if (error.response && error.response.status === 403) {
					// 如果服务端返回1403则认为当前请求资源要求登录，而当前会话未登录，跳至登录页面
					if (error.response.data && error.response.data.statusCode === 1403) {
						// 未登录
						window.location.href =
							BASE_URL.webServer +
							'/admin/loginPage.ac?fw=' +
							encodeURIComponent(window.location.href)
						return
					} else if (
						error.response.data &&
						error.response.data.statusCode === 1401
					) {
						// 无权限
						window.location.href =
							BASE_URL.webServer + '/admin/error/authenticationFailed.ac'
						return
					} else if (error.response.data && error.response.data.content) {
						// 其他情况弹出错误提示
						this.errorHandle(error.response.data.content)
					}
				} else {
					this.errorHandle(
						error.response && error.response.data && error.response.data.content
							? error.response.data.content
							: error.message
					)
				}
				return Promise.reject(error)
			}
		)
	}

	// 通用错误回调
	errorHandle(msg) {
		// 非静默请求才提示
		ElMessage({
			message: msg,
			type: 'error',
			duration: 2 * 1000,
		})
		$loadStore.error()
	}

	// 解锁并隐藏loading
	stopConnectStatus() {
		this.lock = false
		if (!this.silence) {
			$loadStore.requestHandle('end')
		}
	}

	// 发送请求获取数据方法
	connect() {
		// 锁定请求
		if (this.lock) return
		this.lock = true
		return this.service(this.option)
	}
}

// 因为项目结构问题，这里需要用函数中转一下，不然在被引入的js文件内可直接return new requst({option})
function requst(option) {
	return new Http(option)
}

export default requst
