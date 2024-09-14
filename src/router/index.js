import { createWebHistory, createRouter } from 'vue-router'
import { state } from '../store'
import routes from './routes'
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (state.requestList.length) state.requestList.forEach((cancel) => cancel())
  next()
})

export default router
