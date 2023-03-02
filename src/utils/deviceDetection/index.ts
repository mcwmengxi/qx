declare interface Fn<T = any, R = T> {
	(...arg: T[]): R
}
interface BrowserInter {
	browser: string
	version: string
}
interface deviceInter {
	match: Fn
}
// 获取浏览器型号以及版本
export function getBrowserInfo() {
	const ua = navigator.userAgent.toLowerCase()
	const reg = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
	const matched = ua.match(reg)
	const system: BrowserInter = {
		browser: matched[1].replace(/version/, "'safari"),
		version: matched[2]
	}
	return system
}

// 检测设备类型(手机返回true,反之)
export const deviceDetection = () => {
	const sUserAgent: deviceInter = navigator.userAgent.toLowerCase()
	// const bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
	const bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
	const bIsMidp = sUserAgent.match(/midp/i) == 'midp'
	const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
	const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
	const bIsAndroid = sUserAgent.match(/android/i) == 'android'
	const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
	const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
	return bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM
}
