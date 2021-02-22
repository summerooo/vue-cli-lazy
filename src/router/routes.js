import common from '../views/common'


const mine = {
  path: '/mine',
  name: 'mine',
  meta: {
    module: '扫雷'
  },
  redirect: '/mine/home',
  component: common,
  children: [
    {
      path: '/mine/home',
      name: 'mineHome',
      meta: {
        title: '首页'
      },
      component: () => import('../views/mine/mine')
    },
  ]
}

const layout = {
  path: '/layout',
  name: 'layout',
  component: () => import('../views/layout'),
  children: [
    mine
  ]
}
const index = {
  path: '',
  name: 'index',
  redirect: '/mine/home'
}
const other = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/other/signIn'),
  }
]

export default [
  index,
  layout,
  ...other
]