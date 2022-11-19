import { defineConfig, UserConfigExport } from 'vite'
import type { ConfigEnv } from 'vite'
import { getPluginsList } from './build/plugins'
import pkg from './package.json'
import { resolve } from 'path'
// https://vitejs.dev/config/

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
const { name, version } = pkg
const __APP_INFO__ = {
  pkg: {}
}
export default defineConfig(({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: getPluginsList(command),
    resolve: {
      alias: {
        // '@': resolve(__dirname, 'src'),
        '@': pathResolve('src'),
        '@build': pathResolve('build')
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/elementplus/index.scss" as *;`,
        },
      },
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过400kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("index.html")
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    // 定义全局常量替换方式
    define: {
       __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
