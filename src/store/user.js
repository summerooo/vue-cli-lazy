import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 用户状态管理（Setup Store 写法）
 *
 * 管理用户登录信息和 Token：
 * - token 持久化到 localStorage（刷新页面后保持登录）
 * - info 不持久化（每次刷新从接口重新获取，避免数据陈旧）
 * - 提供 isLoggedIn getter 用于权限判断
 */
export const useUserStore = defineStore(
  'user',
  () => {
    /** 用户信息对象 */
    const info = ref({})

    /** 登录凭证 Token */
    const token = ref('')

    /** 是否已登录 */
    const isLoggedIn = computed(() => !!token.value)

    /** 用户名（便捷 getter） */
    const username = computed(() => info.value?.name || '')

    /**
     * 设置用户信息
     * @param {object} userData - 用户信息对象
     */
    function setUser(userData) {
      info.value = userData
    }

    /**
     * 设置 Token
     * @param {string} newToken
     */
    function setToken(newToken) {
      token.value = newToken
    }

    /**
     * 退出登录：清除用户信息和 Token
     */
    function logout() {
      info.value = {}
      token.value = ''
    }

    return {
      info,
      token,
      isLoggedIn,
      username,
      setUser,
      setToken,
      logout,
    }
  },
  {
    persist: {
      // 只持久化 token，不暴露完整用户信息到 localStorage
      pick: ['token'],
    },
  },
)
