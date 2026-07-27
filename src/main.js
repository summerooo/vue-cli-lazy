import { createApp } from 'vue'
import '@/assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'

const app = createApp(App)

// 注册插件（顺序：Pinia → Router，确保路由守卫中可使用 Store）
app.use(pinia)
app.use(router)

app.mount('#app')
