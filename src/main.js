import { createApp } from 'vue'
import '@/assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'

/**
 * 动态加载 Iconfont Symbol 多色矢量脚本 (开发在线调试/本地资源引入)
 * @param {string} url - Iconfont Symbol JS 地址 (例如: '//at.alicdn.com/t/font_1014539_qgm9beagfyk.js')
 */
function loadIconfontSymbol(url) {
  if (!url || typeof document === 'undefined') return
  const script = document.createElement('script')
  script.src = url.startsWith('//') ? `https:${url}` : url
  script.async = true
  document.head.appendChild(script)
}

// 示例：载入 Iconfont 在线 Symbol 脚本（生产环境替换为本地 assets/iconfont/iconfont.js）
loadIconfontSymbol('//at.alicdn.com/t/font_1014539_qgm9beagfyk.js')

const app = createApp(App)

// 注册插件（顺序：Pinia → Router，确保路由守卫中可使用 Store）
app.use(pinia)
app.use(router)

app.mount('#app')
