import { permission } from './permission'
import { debounce } from './debounce'
import { copy } from './copy'
import { lazy } from './lazy'
import { draggable } from './draggable'
import { focus } from './focus'
import { ripple } from './ripple'

/**
 * Vue 全局自定义指令注册插件 (企业级全量指令集)
 */
export default {
  install(app) {
    app.directive('permission', permission) // 权限指令 v-permission
    app.directive('debounce', debounce) // 防抖指令 v-debounce
    app.directive('copy', copy) // 复制指令 v-copy
    app.directive('lazy', lazy) // 懒加载指令 v-lazy
    app.directive('draggable', draggable) // 拖拽指令 v-draggable
    app.directive('focus', focus) // 聚焦指令 v-focus
    app.directive('ripple', ripple) // 水波纹指令 v-ripple
  },
}
