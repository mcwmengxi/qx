import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import { ElMessage } from 'element-plus'
import pinia from '@/stores'
import loadStore from '@/stores/modules/load'
import userStore from '@/stores/modules/user'
import { stringify } from 'qs'
import NProgress from '@/plugins/nprogress'
import { HttpError, HttpOption, HttpAxiosRequestConfig, HttpAxiosResponse, HttpAxiosError, RequestMethods } from './types'
import { formatToken, getToken } from '../auth'

const $loadStore = loadStore(pinia)
const $user = userStore()
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
	baseURL: import.meta.env.BASE_URL, // api的base_url
	timeout: 300000, // 请求超时时间
	withCredentials: true, // 允许携带cookie
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	},
	// 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
	paramsSerializer: {
		serialize: stringify as unknown as CustomParamsSerializer
	}
}

class Http {
	private option: HttpOption
	private intercept: boolean
	private silence: boolean
	private errorSilence: boolean
	private service: any
	private lock: any

	/** token过期后，暂存待执行的请求 */
	private static requests = []
	/** 防止重复刷新token */
	private static isRefreshing = false
	/** 初始化配置对象 */
	private static initConfig: HttpAxiosRequestConfig = {}
	/** 保存当前Axios实例对象 */
	private static axiosInstance: AxiosInstance = axios.create(defaultConfig)

	constructor(option: HttpOption) {
		this.option = option
		// 是否拦截
		this.intercept = this.option.intercept === true
		// 是否静默请求
		this.silence = this.option.silence === true
		this.errorSilence = this.option.errorSilence ?? false
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
		this.service = axios.create(defaultConfig)
		this.serviceInterceptorsRequest()
		this.serviceInterceptorsResponse()
	}
	/** 重连原始请求 */
	private static retryOriginalRequest(config: HttpAxiosRequestConfig) {
		return new Promise(resolve => {
			Http.requests.push((token: string) => {
				config.headers['Authorization'] = formatToken(token)
				resolve(config)
			})
		})
	}

	// 请求拦截
	private serviceInterceptorsRequest() {
		this.service.interceptors.request.use(
			(config: HttpAxiosRequestConfig) => {
				// 开启进度条动画
				NProgress.start()
				// 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
				if (typeof config.beforeRequestCallback === 'function') {
					config.beforeRequestCallback(config)
					return config
				}
				if (Http.initConfig.beforeRequestCallback) {
					Http.initConfig.beforeRequestCallback(config)
					return config
				}
				// console.log('test', config)
				/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
				const whiteList = ['/refreshToken', '/login']
				return whiteList.some(v => config.url.indexOf(v) > -1)
					? config
					: new Promise((resolve, reject) => {
							const tokenInfo = getToken()
							const expiresTime = typeof tokenInfo.expires === 'number' ? tokenInfo.expires : (tokenInfo.expires as Date).getTime()
							if (tokenInfo) {
								const expires = expiresTime - Date.now() <= 0
								if (expires) {
									// 刷新token
									if (!Http.isRefreshing) {
										Http.isRefreshing = true
										$user
											.autoRefreshToken({ refreshToken: tokenInfo.refreshToken })
											.then((res: any) => {
												const token = res.data.accessToken
												config.headers['Authorization'] = formatToken(token)
												Http.requests.forEach(cb => cb(token))
												Http.requests = []
											})
											.finally(() => {
												Http.isRefreshing = false
											})
									}
									resolve(Http.retryOriginalRequest(config))
								} else {
									config.headers['Authorization'] = formatToken(tokenInfo.accessToken)
									resolve(config)
								}
							} else {
								resolve(config)
							}
					  })
			},
			error => {
				return Promise.reject(error)
			}
		)
	}
	// 响应拦截
	private serviceInterceptorsResponse() {
		this.service.interceptors.response.use(
			(response: HttpAxiosResponse) => {
				const $config = response.config
				// 关闭进度条动画
				NProgress.done()
				// 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
				if (typeof $config.beforeResponseCallback === 'function') {
					$config.beforeResponseCallback(response)
					return response.data
				}
				if (Http.initConfig.beforeResponseCallback) {
					Http.initConfig.beforeResponseCallback(response)
					return response.data
				}
				this.stopConnectStatus()
				if (this.intercept) {
					console.log(response)
					if (response.data.statusCode === 1) {
						return response.data
					} else {
						this.errorHandle(response.data.message || '请求发生错误')
					}
				}
				return response.data
			},
			(error: HttpAxiosError) => {
				const $error = error
				$error.isCancelRequest = axios.isCancel($error)
				// 关闭进度条动画
				NProgress.done()

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
						window.location.href = window.BASE_URL.webServer + '/admin/loginPage.ac?fw=' + encodeURIComponent(window.location.href)
						return
					} else if (error.response.data && error.response.data.statusCode === 1401) {
						// 无权限
						window.location.href = window.BASE_URL.webServer + '/admin/error/authenticationFailed.ac'
						return
					} else if (error.response.data && error.response.data.content) {
						// 其他情况弹出错误提示
						this.errorHandle(error.response.data.content)
					}
				} else {
					this.errorHandle(
						error.response && error.response.data && error.response.data.content ? error.response.data.content : error.message
					)
				}
				// 所有的响应异常 区分来源为取消请求/非取消请求
				return Promise.reject(error)
			}
		)
	}
	// 通用错误回调
	private errorHandle(msg: any) {
		// 非静默请求才提示
		ElMessage({
			message: msg,
			type: 'error',
			duration: 2 * 1000
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

	/** 通用请求工具函数 */
	public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: HttpAxiosRequestConfig): Promise<T> {
		const config = {
			method,
			url,
			...param,
			...axiosConfig
		} as HttpAxiosRequestConfig

		// 单独处理自定义请求/响应回掉
		return new Promise((resolve, reject) => {
			this.service
				.request(config)
				.then((response: undefined) => {
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	/** 单独抽离的post工具函数 */
	public post<T, P>(url: string, params?: T, config?: HttpAxiosRequestConfig): Promise<P> {
		return this.request<P>('post', url, params, config)
	}

	/** 单独抽离的get工具函数 */
	public get<T, P>(url: string, params?: T, config?: HttpAxiosRequestConfig): Promise<P> {
		return this.request<P>('get', url, params, config)
	}
}

// 因为项目结构问题，这里需要用函数中转一下，不然在被引入的js文件内可直接return new requst({option})
function requst(option: HttpOption) {
	return new Http(option)
}

// 默认导出请求工具函数
export default requst
