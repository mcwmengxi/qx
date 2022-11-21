import type { Plugin } from 'vite'
import viteCompression from 'vite-plugin-compression'

export const compressPluginConfig = (compress: ViteCompression): Plugin | Plugin[] => {
	if (compress === 'none') return null
	const gz = {
		// 生成的压缩包后缀
		ext: '.gz',
		// 体积大于threshold才会被压缩
		threshold: 0,
		// 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
		filter: () => true,
		// 压缩后是否删除原始文件
		deleteOriginFile: false
	}

	const br = {
		ext: '.br',
		algorithm: 'brotliCompress',
		threshold: 0,
		filter: () => true,
		deleteOriginFile: false
	}
	const configList = [
		{ k: 'gzip', v: gz },
		{ k: 'brotli', v: br },
		{ k: 'both', v: [gz, br] }
	]
	const plugin: Plugin[] = []

	configList.forEach(configItem => {
		if (compress.includes(configItem.k)) {
			if (compress.includes('clear')) {
				// 清除原始文件
				if (Array.isArray(configItem.v)) {
					// both
					configItem.v.forEach(item => {
						plugin.push(viteCompression(Object.assign(item, { deleteOriginFile: true })))
					})
				} else {
					plugin.push(viteCompression(Object.assign(configItem.v, { deleteOriginFile: true })))
				}
			} else {
				if (Array.isArray(configItem.v)) {
					// both
					configItem.v.forEach(item => {
						plugin.push(viteCompression(item))
					})
				} else {
					plugin.push(viteCompression(configItem.v))
				}
			}
		}
	})

	return plugin
}
