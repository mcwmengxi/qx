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
