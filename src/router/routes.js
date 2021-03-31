import common from '../views/common/index.vue'

const mine = {
  path: '/mine',
  name: 'mine',
  meta: {
    module: '扫雷',
  },
  redirect: '/mine/home',
  component: common,
  children: [
    {
      path: '/mine/home',
      name: 'mineHome',
      meta: {
        title: '首页',
      },
      component: () => import('../views/layout/mine/mine.vue'),
    },
  ],
}

const layout = {
  path: '/layout',
  name: 'layout',
  component: () => import('../views/layout/index.vue'),
  children: [mine],
}

const index = {
  path: '',
  name: 'index',
  redirect: '/mine/home',
}

const other = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/other/signIn.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/other/notFound.vue') },
]

export default [index, layout, ...other]
