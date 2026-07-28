/**
 * v-copy 一键复制指令
 *
 * 用法: <span v-copy="orderNo">复制订单号</span>
 * 作用: 点击元素时自动将绑定的文本写入系统剪贴板 (含 IP / 非 HTTPS 环境的安全降级兜底)
 */
export const copy = {
  mounted(el, binding) {
    el.__copyText__ = binding.value

    el.__copyHandler__ = async function () {
      const textToCopy = String(el.__copyText__ ?? '')
      if (!textToCopy) return

      try {
        // 优先使用现代安全的 Clipboard API (仅在 localhost / HTTPS 生效)
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy)
        } else {
          // 降级兜底方案: 用于 HTTP / 局域网 IP (192.168.x.x) 访问环境
          const textarea = document.createElement('textarea')
          textarea.value = textToCopy
          textarea.style.position = 'fixed'
          textarea.style.left = '-9999px'
          textarea.style.top = '-9999px'
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
        }
        console.log('[v-copy]: 复制成功 ->', textToCopy)
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
