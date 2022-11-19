import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'
import { getPluginsList } from './build/plugins'

import { resolve } from 'path'
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }: ConfigEnv) => {
  return {
    plugins: getPluginsList(command),
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
