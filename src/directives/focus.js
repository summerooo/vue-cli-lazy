/**
 * v-focus 自动获取焦点指令
 *
 * 用法: <input v-focus type="text" />
 * 作用: 组件挂载后自动聚焦到原生输入框或 Component 内部输入框
 */
export const focus = {
  mounted(el) {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.focus()
    } else {
      const input = el.querySelector('input, textarea')
      if (input) input.focus()
    }
  },
}
