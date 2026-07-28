import { useUserStore } from '@/store/user'

/**
 * v-permission 自定义指令鉴权
 *
 * 【用法示例】:
 * <button v-permission="['order:refund:approve', 'order:refund:reject']">同意退款</button>
 *
 * 【设计规范: 三段式冒号分割 (模块:资源:操作)】:
 * 1. 第一段 order  : 业务模块命名空间，防止不同模块动作同名冲突 (如 order:refund:approve vs goods:comment:approve)
 * 2. 第二段 refund : 具体的资源对象 (退款单)
 * 3. 第三段 approve: 具体的 CRUD / 审批动作 (审核通过)
 *
 * 【通配符规则】:
 * - '*:*:*'        : 超级管理员，拥有全部系统权限
 * - 'order:*:*'    : 拥有订单模块下所有资源的操作权限
 * - 'order:refund:*': 拥有退款资源的一切 CRUD/审批权限
 *
 * 【作用】:
 * 当用户不具备所需权限字符时，从 DOM 树上物理移除该元素。
 */
export const permission = {
  mounted(el, binding) {
    const { value: requiredPerms } = binding

    // 如果传入的权限是数组且不为空
    if (requiredPerms && Array.isArray(requiredPerms) && requiredPerms.length > 0) {
      const userStore = useUserStore()
      // 获取当前用户的所有权限字符 (例如 ['order:refund:approve', 'order:info:query'])
      const userPerms = userStore.userInfo?.permissions || []

      // 比对权限：包含要求的权限，或者拥有 '*:*:*' 超级管理员标识
      const hasPermission = userPerms.some(perm => perm === '*:*:*' || requiredPerms.includes(perm))

      // 核心解耦点：没有权限则物理拔除 DOM，而不是 display: none
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      console.warn(
        `[v-permission]: 权限参数无效, 期望数组格式例如 v-permission="['order:refund:approve']"`,
      )
    }
  },
}
