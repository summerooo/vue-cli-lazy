import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const mine = {
  path: '/mine',
  name: 'mine',
  meta: {
    module: '扫雷'
  },
  redirect: '/mine/home',
  component: () => import('../views/mine'),
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
  component: () => import('../views/layout.vue'),
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
    component: () => import('../views/login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    index,
    layout,
    ...other
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.requestList.length) {
    store.state.requestList.forEach(cancel => cancel())  
  }
  next()
})

export default router