/**
 * v-copy 一键复制指令
 *
 * 用法: <span v-copy="orderNo">复制订单号</span>
 * 作用: 点击元素时自动将绑定的文本写入系统剪贴板
 */
export const copy = {
  mounted(el, binding) {
    el.__copyText__ = binding.value

    el.__copyHandler__ = async function () {
      if (!el.__copyText__) return
      try {
        await navigator.clipboard.writeText(String(el.__copyText__))
        console.log('[v-copy]: 复制成功 ->', el.__copyText__)
      } catch (err) {
        console.error('[v-copy]: 复制失败 ->', err)
      }
    }

    el.style.cursor = 'pointer'
    el.addEventListener('click', el.__copyHandler__)
  },
  updated(el, binding) {
    el.__copyText__ = binding.value
  },
  unmounted(el) {
    if (el.__copyHandler__) {
      el.removeEventListener('click', el.__copyHandler__)
      delete el.__copyHandler__
      delete el.__copyText__
    }
  },
}
