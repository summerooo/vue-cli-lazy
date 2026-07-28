/**
 * v-lazy 图片懒加载指令
 *
 * 用法: <img v-lazy="realPicUrl" src="placeholder.png" />
 * 作用: 利用 IntersectionObserver 监听图片进入视口后再加载真实图片
 */
export const lazy = {
  mounted(el, binding) {
    const realSrc = binding.value
    if (!realSrc) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.src = realSrc
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    el.__lazyObserver__ = observer
  },
  unmounted(el) {
    if (el.__lazyObserver__) {
      el.__lazyObserver__.disconnect()
      delete el.__lazyObserver__
    }
  },
}
