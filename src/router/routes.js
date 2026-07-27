/**
 * 路由表配置
 */

/** 主布局与业务页面 */
const layoutRoute = {
  path: '/layout',
  name: 'layout',
  component: () => import('@/views/layout/index.vue'),
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
      },
      component: () => import('@/views/home.vue'),
    },
  ],
}

/** 根路由重定向 */
const rootRoute = {
  path: '/',
  redirect: '/home',
}

/** 独立页面 (无需 Layout 包裹) */
const standaloneRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '页面不存在',
    },
    component: () => import('@/views/notFound.vue'),
  },
]

export default [rootRoute, layoutRoute, ...standaloneRoutes]
