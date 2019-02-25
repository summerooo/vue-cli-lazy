import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hw',
      name: 'hw',
      component: () => import('../views/hw.vue')
    }
  ]
})
