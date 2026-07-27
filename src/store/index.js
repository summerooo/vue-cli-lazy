import { createPinia } from 'pinia'
// 导入 Pinia 自动持久化插件（避免刷新页面后 Token 等 Store 状态丢失）
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

export default pinia
