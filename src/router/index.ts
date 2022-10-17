import HelloWorldVue from '@/components/HelloWorld.vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const constantRoutes:RouteRecordRaw []= [
    {
        path: '/',
        name: 'Index',
        component: HelloWorldVue,
        redirect: '/index',
        children: [
            {
              path: 'index',
              component: () => import('@/views/Home.vue'),
              name: 'Home',
              meta: {
                title: '首页'
              }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router