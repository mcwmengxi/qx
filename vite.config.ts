import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
// https://vitejs.dev/config/

export default defineConfig({
	plugins: [
		vue(),
		Components({
			// 自动导入UI库
			resolvers: [ElementPlusResolver()],
			// 指定组件位置，默认是src/components
			dirs: ['src/components'],
			extensions: ['vue'],
			// 配置文件生成位置
			dts: 'src/types/components.d.ts',
		}),
		AutoImport({
			// 自动导入vue3的hooks
			imports: [
				'vue',
				'vue-router',
				// 'vue-i18n',
				// '@vueuse/head',
				// '@vueuse/core',
			],
			resolvers: [ElementPlusResolver()],
			dts: 'src/types/auto-import.d.ts',
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `$injectedColor: orange;`,
			},
		},
	},
})
