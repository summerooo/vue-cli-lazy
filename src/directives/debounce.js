/**
 * v-debounce 防抖指令
 *
 * 用法: <button v-debounce:300="handleSubmit">提交订单</button>
 * 作用: 拦截连续快速点击，在指定延迟（默认 300ms）内仅触发一次回调
 */
export const debounce = {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      console.warn('[v-debounce]: 绑定的值必须是一个函数')
      return
    }

    const delay = Number(binding.arg) || 300
    let timer = null

    el.__debounceHandler__ = function (event) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value(event)
      }, delay)
    }

    el.addEventListener('click', el.__debounceHandler__)
  },
  unmounted(el) {
    if (el.__debounceHandler__) {
      el.removeEventListener('click', el.__debounceHandler__)
      delete el.__debounceHandler__
    }
  },
}
