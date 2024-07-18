import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: any[] = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/Main.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  // 如果是进入到main
  if (to.path === '/main' && token) {
    return firstMenu?.url
  }
})
export default router
