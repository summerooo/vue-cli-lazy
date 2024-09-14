import { createWebHashHistory, createRouter, createWebHistory } from 'vue-router'
import { state } from '../store'
import routes from './routes'
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  next()
})

export default router
