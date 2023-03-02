import { defineStore } from 'pinia'
const loadStore = defineStore('load', {
	state: () => {
		return {
			requestNum: 0, // 记录请求数量，数量为0再隐藏全局加载样式
			isLoading: false, // 页面loading
			isError: false,
			time: 0 // 用于记录请求时间
		}
	},
	// getters 类似于 computed，可对 state 的值进行二次计算, 数据没有改变的情况下之后会读取缓存
	getters: {},
	// actions 用来修改 state, 支持同步和异步
	actions: {
		// 显示加载页面
		show() {
			this.isLoading = true
			this.time = new Date().getTime()
		},
		// 隐藏加载页面
		hide() {
			const endtime = new Date().getTime()
			// 避免页面闪烁
			const delay = endtime - this.time > 200 ? 0 : 200
			setTimeout(() => {
				if (this.requestNum == 0) {
					this.isLoading = false
					this.time = 0
				}
			}, delay)
		},
		// 显示请求失败页面
		error() {
			this.isError = true
		},
		/**
		 * 将发起的请求记录到内存
		 * @param {string} type (start: 请求开始；end: 请求结束；)
		 */
		requestHandle(type: any) {
			switch (type) {
				case 'start':
					if (!this.isLoading && this.requestNum == 0) {
						this.show()
					}
					this.requestNum++
					break
				case 'end':
					this.requestNum--
					if (this.requestNum <= 0) {
						this.requestNum = 0
						this.hide()
					}
					break
				default:
					break
			}
		}
	}
})

export default loadStore
