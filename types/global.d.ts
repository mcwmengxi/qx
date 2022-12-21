import { type RouteLocationNormalized } from "vue-router"

export { }

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

    interface RouteChildrenConfigsTable {
    /** 子路由地址 `必填` */
    path: string;
    /** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
    name?: string;
    /** 路由重定向 `可选` */
    redirect?: string;
    /** 按需加载组件 `可选` */
    component?: RouteComponent;
    meta?: {
      /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填` */
      title: string;
      /** 菜单图标 `可选` */
      icon?: string | FunctionalComponent;
      /** 菜单名称右侧的额外图标，支持`fontawesome`、`iconfont`、`element-plus-icon` `可选` */
      extraIcon?: {
        svg?: boolean;
        name?: string;
      };
      /** 是否在菜单中显示（默认`true`）`可选` */
      showLink?: boolean;
      /** 是否显示父级菜单 `可选` */
      showParent?: boolean;
      /** 页面级别权限设置 `可选` */
      roles?: Array<string>;
      /** 按钮级别权限设置 `可选` */
      auths?: Array<string>;
      /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
      keepAlive?: boolean;
      /** 内嵌的`iframe`链接 `可选` */
      frameSrc?: string;
      /** `iframe`页是否开启首次加载动画（默认`true`）`可选` */
      frameLoading?: boolean;
      /** 页面加载动画（有两种形式，一种直接采用vue内置的`transitions`动画，另一种是使用`animate.css`写进、离场动画）`可选` */
      transition?: {
        /**
         * @description 当前路由动画效果
         * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
         * @see animate.css {@link https://animate.style}
         */
        name?: string;
        /** 进场动画 */
        enterTransition?: string;
        /** 离场动画 */
        leaveTransition?: string;
      };
      // 是否不添加信息到标签页，（默认`false`）
      hiddenTag?: boolean;
      /** 动态路由可打开的最大数量 `可选` */
      dynamicLevel?: number;
    };
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>;
  }

  /**
   * @description 整体路由配置表（包括完整子路由）
   */
  interface RouteConfigsTable {
    /** 路由地址 `必填` */
    path: string;
    /** 路由名字（保持唯一）`可选` */
    name?: string;
    /** `Layout`组件 `可选` */
    component?: RouteComponent;
    /** 路由重定向 `可选` */
    redirect?: string;
    meta?: {
      /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加）`必填` */
      title: string;
      /** 菜单图标 `可选` */
      icon?: string | FunctionalComponent;
      /** 是否在菜单中显示（默认`true`）`可选` */
      showLink?: boolean;
      /** 菜单升序排序，值越高排的越后（只针对顶级路由）`可选` */
      rank?: number;
    };
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>;
  }
  /**
   * `src/router` 文件夹里的类型声明
   */
  interface toRouteType extends RouteLocationNormalized {
    meta: {
      roles: Array<string>;
      keepAlive?: boolean;
      dynamicLevel?: string;
    };
  }

  /**
 * 对应 `public/serverConfig.json` 文件的类型声明
 */
  interface ServerConfigs {
    Version?: string;
    Title?: string;
    FixedHeader?: boolean;
    HiddenSideBar?: boolean;
    MultiTagsCache?: boolean;
    KeepAlive?: boolean;
    Locale?: string;
    Layout?: string;
    Theme?: string;
    DarkMode?: boolean;
    Grey?: boolean;
    Weak?: boolean;
    HideTabs?: boolean;
    SidebarStatus?: boolean;
    EpThemeColor?: string;
    ShowLogo?: boolean;
    ShowModel?: string;
    MenuArrowIconNoTransition?: boolean;
    CachingAsyncRoutes?: boolean;
    MapConfigure?: {
      amapKey?: string;
      options: {
        resizeEnable?: boolean;
        center?: number[];
        zoom?: number;
      };
    };
  }

  /**
   * 与 `ServerConfigs` 类型不同，这里是缓存到浏览器本地存储的类型声明
   */
  interface StorageConfigs {
    version?: string;
    title?: string;
    fixedHeader?: boolean;
    hiddenSideBar?: boolean;
    multiTagsCache?: boolean;
    keepAlive?: boolean;
    locale?: string;
    layout?: string;
    theme?: string;
    darkMode?: boolean;
    grey?: boolean;
    weak?: boolean;
    hideTabs?: boolean;
    sidebarStatus?: boolean;
    epThemeColor?: string;
    showLogo?: boolean;
    showModel?: string;
    username?: string;
  }
}
