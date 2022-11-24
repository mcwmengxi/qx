export {}
declare global {
	interface Window {
		// Global vue app instance
		BASE_URL:Record<string, any>
	}
	interface ImportMetaEnv extends ViteEnv {
		__: unknown
		BASE_URL: string
	}

	// 压缩类型
	type ViteCompression = 'none' | 'gzip' | 'brotli' | 'both' | 'gzip-clear' | 'brotli-clear' | 'both-clear'

  type Recordable<T = any> = Record<string, T>
  declare interface ViteEnv {
    VITE_PORT: number
    VITE_BASE_URL?: string
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_LEGACY: boolean;
    VITE_COMPRESSION: ViteCompression;
  }
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  }
}
