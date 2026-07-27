import { createWebHistory, createRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/** 不需要登录即可访问的路由白名单 */
const WHITE_LIST = ['login', 'NotFound']

/**
 * 全局前置守卫
 *
 * 1. 取消上一个页面的未完成请求
 * 2. 检查登录状态（白名单外的页面需要 Token）
 */
router.beforeEach((to, from, next) => {
  // 取消上一个页面的未完成请求
  const appStore = useAppStore()
  appStore.clearRequests()

  // 白名单内的路由直接放行
  if (WHITE_LIST.includes(to.name)) {
    return next()
  }

  // 非白名单路由需要检查 Token
  const userStore = useUserStore()
  if (!userStore.isLoggedIn) {
    // 未登录 → 跳转登录页，并记录原始目标路由
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  next()
})

/**
 * 全局后置守卫
 *
 * 自动更新页面标题（从路由 meta.title 读取）
 */
router.afterEach(to => {
  const baseTitle = import.meta.env.VITE_APP_TITLE || 'Vue CLI Lazy'
  document.title = to.meta?.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
})

export default router
