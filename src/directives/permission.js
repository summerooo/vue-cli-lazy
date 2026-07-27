import { useUserStore } from '@/store/user'

/**
 * v-permission 自定义指令鉴权
 *
 * 用法: <button v-permission="['admin', 'editor']">删除</button>
 * 作用: 当用户角色不包含要求的权限时，从 DOM 树上物理移除该元素。
 */
export const permission = {
  mounted(el, binding) {
    const { value: requiredRoles } = binding

    // 如果传入的权限是数组且不为空
    if (requiredRoles && Array.isArray(requiredRoles) && requiredRoles.length > 0) {
      const userStore = useUserStore()
      // 获取当前用户的所有角色权限，默认为空数组
      const userRoles = userStore.userInfo?.roles || []

      // 比对权限：用户的角色中是否存在 requiredRoles 里要求的角色
      const hasPermission = userRoles.some(role => requiredRoles.includes(role))

      // 核心解耦点：没有权限则物理拔除 DOM，而不是 display: none
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      console.warn(`[v-permission]: 权限参数无效, 期望数组格式例如 v-permission="['admin']"`)
    }
  },
}
