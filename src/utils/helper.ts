export function isUrl(url) {
	const urlReg = `^((https|http|ftp|rtsp|mms)?://)(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$`
	return new RegExp(urlReg).test(url)
}
export type Target = '_blank' | '_self' | '_parent' | '_top' | 'framename'

/**
 *
 * @param url 要跳转的超链接地址
 * @param target  _blank	在新窗口中打开被链接文档（默认）
 *                _self	在相同的框架中打开被链接文档
 *                _parent	在父框架集中打开被链接文档
 *                _top	在整个窗口中打开被链接文档
 *                framename	在指定的框架中打开被链接文档
 */
export const openLink = (url: string, target: Target = '_blank') => {
	const ele = document.createElement('a')
	ele.setAttribute('href', url)
	ele.setAttribute('target', target)
	ele.setAttribute('rel', 'noreferrer noopener')
	ele.setAttribute('id', 'external')
	const externalNode = document.getElementById('external')
	externalNode && document.body.removeChild(externalNode)
	document.body.appendChild(ele)
	ele.click()
	ele.remove()
}

/**
 * @description 判断两者是否相等
 * @param a 前者
 * @param b 后者
 * @returns `boolean`
 */
export function isEqual(t, n) {
	const e = Object.prototype.toString.call(t)
	return e !== Object.prototype.toString.call(n)
		? false
		: e === '[object Object]'
		? isEqualObject(t, n)
		: e === '[object Array]'
		? isEqualArray(t, n)
		: e === '[object Function]'
		? t === n
			? true
			: t.toString() === n.toString()
		: t === n
}
/**
 * @description 判断两个对象是否相等
 * @param obj 前一个对象
 * @param other 后一个对象
 * @returns `boolean`
 */
function isEqualObject(obj: Record<string, unknown> | undefined, other: Record<string, unknown> | undefined) {
	if (!obj || !other || obj.length !== other.length) return false
	for (const key of Object.keys(obj)) if (!isEqual(obj[key], other[key])) return false
	return true
}
/**
 * @description 判断两个数组是否相等
 * @param arr 前一个数组
 * @param other 后一个数组
 * @returns `boolean`
 */
function isEqualArray(arr: Array<unknown> | unknown, other: Array<unknown> | unknown) {
	if (!arr || !other) return false
	const { length: arrLen } = arr as Array<unknown>
	const { length: otherLen } = other as Array<unknown>
	if (arrLen !== otherLen) return false
	for (let r = 0; r < arrLen; r++) if (!isEqual(arr[r], other[r])) return false
	return true
}
