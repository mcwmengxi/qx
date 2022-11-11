import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }: ConfigEnv) => {
	return {
		plugins: [
			vue(),
			viteMockServe({
				// default
				mockPath: 'mock',
				localEnabled: command === 'serve',
			}),
			Components({
				// 自动导入UI库
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass',
					}),
				],
				// 指定组件位置，默认是src/components
				dirs: ['src/components', 'src/views'],
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
				// eslint报错解决
				eslintrc: {
					enabled: false, // Default `false`
					filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
					globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
				},
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass',
					}),
				],
				dts: 'src/types/auto-import.d.ts',
			}),
			Unocss(),
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/elementplus/index.scss" as *;`,
				},
			},
		},
	}
})
