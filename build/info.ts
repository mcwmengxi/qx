import pc, { green, bold, blue } from 'picocolors'
import { ResolvedConfig } from 'vite'
import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import fs from 'fs'
dayjs.extend(duration)
export function viteBuildInfo() {
	let config: { command: string }
	let startTime: Dayjs
	let endTime: Dayjs
	return {
		name: 'vite:buildInfo',
		configResolved(resolvedConfig: ResolvedConfig): void | Promise<void> {
			// 在解析 Vite 配置后调用。使用这个钩子读取和存储最终解析的配置。
			// 当插件需要根据运行的命令做一些不同的事情时，它也很有用
			config = resolvedConfig
		},
		buildStart() {
			// 服务器启动时被调用
			console.log(bold(green(`👏欢迎使用${pc.blue('[qx]')}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/mcwmengxi/qx`)))
			if (config.command === 'build') {
				startTime = dayjs(new Date())
			}
		},
		closeBundle() {
			// 服务器关闭时被调用
			if (config.command === 'build') {
				endTime = dayjs(new Date())
				// 可以使用参数的回调函数执行，也可以在返回的Promise回调中执行
				getPackageSize({
					folder: 'dist',
					format: true,
					callback: (size: string) => {
						console.log(
							bold(green(`🎉恭喜打包完成（总用时${dayjs.duration(endTime.diff(startTime)).format('mm分ss秒')}，打包后的大小为${size}）`))
						)
					}
				})
			}
		}
	}
}

function getPackageSize({ folder = 'dist', format = true, callback }) {
	const filesList = []
	readFile(folder, filesList)
	const totalSize = filesList.reduce((prev, curr) => {
		return prev + curr.size
	}, 0)
	return new Promise((resolve, reject) => {
		if (filesList.length) {
			if (format) {
				callback(formatBytes(totalSize))
				return resolve(formatBytes(totalSize))
			} else {
				callback(totalSize)
				return resolve(totalSize)
			}
		} else {
			if (format) {
				callback(formatBytes(0))
				return resolve(formatBytes(0))
			} else {
				callback(0)
				return resolve(0)
			}
		}
	})
}

//遍历读取文件
function readFile(path, filesList) {
	const files = fs.readdirSync(path) //需要用到同步读取
	// console.log("返回目录中的文件名或文件对象", files);

	files.forEach(walk)
	function walk(file) {
		// console.log(file);
		const states = fs.statSync(path + '/' + file)
		if (states.isDirectory()) {
			readFile(path + '/' + file, filesList)
		} else {
			//创建一个对象保存信息
			const obj: any = new Object()
			obj.size = states.size //文件大小，以字节为单位
			obj.name = file //文件名
			obj.path = path + '/' + file //文件绝对路径
			filesList.push(obj)
		}
	}
}
function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes'
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
