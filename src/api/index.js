/**
 * API 请求核心配置文件
 *
 * 包含 Axios 实例创建、请求拦截器（Token 注入/取消请求）、响应拦截器（401跳转/错误处理）
 */

import axios from 'axios'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import router from '@/router'

// 创建独立的 Axios 实例
const request = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const appStore = useAppStore()

    // 注入 Token
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }

    // 添加请求取消逻辑（路由切换时自动取消未完成请求）
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    appStore.addCancel(() => source.cancel('Route change'))

    return config
  },
  error => Promise.reject(error),
)

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    // 路由切换取消请求
    if (axios.isCancel(error)) {
      console.log('[Request Canceled]', error.message)
      return Promise.reject(error)
    }

    // 状态码处理
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        const userStore = useUserStore()
        userStore.logout()
        router.push({ name: 'login' })
      }
    }

    return Promise.reject(error)
  },
)

export default request
