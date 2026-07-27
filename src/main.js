import { createApp } from 'vue'
import '@/assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'
import directives from './directives'

import '@/utils/iconfont.js'

const app = createApp(App)

// 注册插件（顺序：Pinia → Router，确保路由守卫中可使用 Store）
app.use(pinia)
app.use(router)
app.use(directives) // 注册全局自定义指令 (如 v-permission)

app.mount('#app')
