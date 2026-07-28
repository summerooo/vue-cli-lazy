/**
 * v-draggable 拖拽指令
 *
 * 用法: <div v-draggable class="modal-dialog">按住移动</div>
 * 作用: 实现鼠标按住拖拽元素改变位置
 */
export const draggable = {
  mounted(el) {
    el.style.position = 'absolute'
    el.style.cursor = 'move'

    el.__dragMouseDown__ = function (e) {
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop

      function onMouseMove(e) {
        let left = e.clientX - disX
        let top = e.clientY - disY
        el.style.left = `${left}px`
        el.style.top = `${top}px`
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousedown', el.__dragMouseDown__)
  },
  unmounted(el) {
    if (el.__dragMouseDown__) {
      el.removeEventListener('mousedown', el.__dragMouseDown__)
      delete el.__dragMouseDown__
    }
  },
}
