import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import type { ConfigEnv } from 'vite'
import { getPluginsList } from './build/plugins'
import { warpperEnv } from "./build"
import pkg from './package.json'
import { resolve } from 'path'
import { dayjs } from 'element-plus'
// https://vitejs.dev/config/

/** 路径查找 */
const pathResolve = (dir: string): string => {
	return resolve(__dirname, '.', dir)
}
/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();

const { name, version, dependencies, devDependencies } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
}
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const {
    VITE_CDN,
    VITE_PORT,
    VITE_LEGACY,
    VITE_COMPRESSION,
    VITE_PUBLIC_PATH
  } = warpperEnv(loadEnv(mode, root));

  return {
    base: VITE_PUBLIC_PATH,
    root,
		plugins: getPluginsList(command, VITE_LEGACY, VITE_CDN, VITE_COMPRESSION),
		resolve: {
			alias: {
				// '@': resolve(__dirname, 'src'),
				'@': pathResolve('src'),
				'@build': pathResolve('build')
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/elementplus/index.scss" as *;`
				}
			}
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {}
    },
    optimizeDeps: {
      include: ["pinia", "@vueuse/core", "dayjs"],
    },
		build: {
      sourcemap: false,
			// 消除打包大小超过400kb警告
			chunkSizeWarningLimit: 4000,
      rollupOptions: {
				input: {
					index: pathResolve('index.html')
				},
				// 静态资源分类打包
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
				}
			}
		},
		// 定义全局常量替换方式
		define: {
			__INTLIFY_PROD_DEVTOOLS__: false,
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		}
	}
}
