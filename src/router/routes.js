import Layout from '@/views/layout/index.vue'

/**
 * 路由配置表 (基于扁平化 views 结构)
 */
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页扫雷',
          keepAlive: true,
        },
      },
      {
        path: 'directives',
        name: 'directives',
        component: () => import('@/views/directives.vue'),
        meta: {
          title: '指令实验室',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '系统登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/notFound.vue'),
    meta: {
      title: '页面未找到',
    },
  },
]

export default routes
