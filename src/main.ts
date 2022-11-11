import { createApp } from 'vue'
import '@/styles/style.css'
import 'uno.css'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/notification.scss'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores'

createApp(App).use(pinia).use(router).mount('#app')
