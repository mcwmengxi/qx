
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { cdn } from './cdn'
import vue from '@vitejs/plugin-vue'
import legacy from "@vitejs/plugin-legacy";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
export function getPluginsList(command: string,  VITE_LEGACY: boolean, VITE_CDN: boolean, VITE_COMPRESSION: any) {
  return [
    vue(),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
    VITE_CDN ? cdn : null,
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
      // dts: 'types/components.d.ts',
    }),
    AutoImport({
      // 自动导入vue3的hooks
      // imports: [
      //   'vue',
      //   'vue-router',
        // 'vue-i18n',
        // '@vueuse/head',
        // '@vueuse/core',
      // ],
      // eslint报错解决
      // eslintrc: {
      //   enabled: false, // Default `false`
      //   filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      //   globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      // },
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      // dts: 'types/auto-import.d.ts',
    }),
    // Unocss(),
    // svg组件化支持
    svgLoader({
      defaultImport: 'component' // component url raw
    }),
    // 是否为打包后的文件提供传统浏览器兼容性支持
    VITE_LEGACY
      ? legacy({
          targets: ["ie >= 11"],
          additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
        })
      : null,
  ]
}
