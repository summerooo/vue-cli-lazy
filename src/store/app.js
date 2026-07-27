import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 应用级状态管理（Setup Store 写法）
 *
 * 管理全局的请求取消队列：
 * - 每次发起请求时，将 cancel 函数存入队列
 * - 路由切换时，调用所有 cancel 函数取消未完成的请求
 * - 避免页面切换后无用请求继续占用带宽
 */
export const useAppStore = defineStore('app', () => {
  /** 请求取消函数队列 */
  const pendingRequests = ref([])

  /**
   * 添加请求取消函数
   * @param {Function} cancel - Axios CancelToken 的 cancel 函数
   */
  function addCancel(cancel) {
    pendingRequests.value.push(cancel)
  }

  /**
   * 取消所有未完成的请求并清空队列
   * 通常在路由守卫 beforeEach 中调用
   */
  function clearRequests() {
    pendingRequests.value.forEach(cancel => cancel())
    pendingRequests.value = []
  }

  return {
    pendingRequests,
    addCancel,
    clearRequests,
  }
})
