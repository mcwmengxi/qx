declare global {
  interface Window {
    // Global vue app instance
    BASE_URL: Object
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
    BASE_URL: string
  }

  declare interface ViteEnv {
    VITE_PORT: number
    VITE_BASE_URL: string
  }
}
