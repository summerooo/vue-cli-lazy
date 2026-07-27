import { permission } from './permission'

/**
 * Vue 自定义指令全局注册插件
 */
export default {
  install(app) {
    app.directive('permission', permission)
  },
}
