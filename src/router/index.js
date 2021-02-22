import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (store.state.requestList.length) store.state.requestList.forEach(cancel => cancel())  
  next()
})

export default router