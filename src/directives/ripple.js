/**
 * v-ripple 按钮水波纹微动画指令
 *
 * 用法: <button v-ripple>科技感按钮</button>
 * 作用: 点击按钮时从点击坐标向外扩散一圈科技感水波纹动画
 */
export const ripple = {
  mounted(el) {
    el.style.position = 'relative'
    el.style.overflow = 'hidden'

    el.__rippleHandler__ = function (e) {
      const rect = el.getBoundingClientRect()
      const rippleSpan = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      rippleSpan.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        background: rgba(255, 255, 255, 0.35);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
      `

      el.appendChild(rippleSpan)
      setTimeout(() => {
        rippleSpan.remove()
      }, 600)
    }

    el.addEventListener('click', el.__rippleHandler__)
  },
  unmounted(el) {
    if (el.__rippleHandler__) {
      el.removeEventListener('click', el.__rippleHandler__)
      delete el.__rippleHandler__
    }
  },
}
