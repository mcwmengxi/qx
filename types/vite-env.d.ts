/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// window全局变量说明
declare interface Window {
  BASE_URL: Object
}
// declare interface ImportMetaEnv {
//   BASE_URL: Object
// }
