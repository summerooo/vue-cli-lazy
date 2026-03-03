import { createWebHistory, createRouter } from 'vue-router'
import { useAppStore } from '../store/app'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  appStore.clearRequests()
  next()
})

export default router
