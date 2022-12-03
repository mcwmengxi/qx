import { createApp } from 'vue'
import '@/styles/index.scss'
// import 'uno.css'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/notification.scss'
// 导入字体图标
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores'
import '@/services/global'
import { MotionPlugin } from '@vueuse/motion'
import Storage from './plugins/storage'
// 全局注册图标库组件
import { FontIcon, IconifyOfflineIcon, IconifyOnlineIcon, BackTop, ElementPlusIcon } from './components/Icons'
import { getServerConfig } from './config'

const app = createApp(App)
app.component('FontIcon', FontIcon)
app.component('IconifyOfflineIcon', IconifyOfflineIcon)
app.component('IconifyOnlineIcon', IconifyOnlineIcon)
app.component('BackTop', BackTop)
app.component('ElementPlusIcon', ElementPlusIcon)

getServerConfig(app).then(async config => {
	app.use(router)
	await router.isReady()
	app.use(pinia)
	app.use(MotionPlugin)
	app.use(Storage, {
		// nameSpace: "test_",
		memory: {
			// starValue: Storage.getData("starValue", "test_") ?? 1
			starValue: Storage.getData('starValue') ?? 1
		}
	})
	app.mount('#app')
})
