// iconfont图标组件
import FontIcon from './src/iconfont'

// svg引入
// svg后面加?component代表将其作为Vue组件引入，以获取更好的类型声明，更多写法请看 https://github.com/jpkleemans/vite-svg-loader#import-params
import BackTop from "@/assets/svg/back_top.svg?component";

//iconify 相关图标的引入
import IconifyOfflineIcon from './src/iconfontOffline';
import IconifyOnlineIcon from './src/iconifyOnline';

import ElementPlusIcon from './src/elementPlusIcon';

export { FontIcon, IconifyOfflineIcon, IconifyOnlineIcon, BackTop, ElementPlusIcon }
