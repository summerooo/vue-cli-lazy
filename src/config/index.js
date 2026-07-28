/**
 * 环境与 API 代理配置中心
 *
 * 自动化设计（单源配置）：
 * 只需要在 environments 中配置后端目标地址（如 targetUser、targetOrder）
 * 1. proxy: 自动根据 currentEnv 生成 Vite 代理配置
 * 2. proxyApi: 自动复用 proxy 派生出前端 API 引用对象
 */

// 1. 各环境配置表（只需要配置此处的地址）
const environments = {
  // 默认本地开发环境 (npm run dev)
  default: {
    targetApi: 'http://192.168.1.100:8080/api', // -> 自动生成 /api 代理
    targetUser: 'http://192.168.1.105:8081/user-service', // -> 自动生成 /user 代理
    targetOrder: 'http://192.168.1.108:8082/order-service', // -> 自动生成 /order 代理
    targetSocket: 'ws://192.168.1.105:8181', // -> 自动生成 /socket 代理
  },

  // 测试环境 (npm run dev:test / npm run build:test)
  'dev:test': {
    targetApi: 'http://192.168.10.200:8080/api',
    targetUser: 'http://192.168.10.201:8081/user-service',
    targetOrder: 'http://192.168.10.202:8082/order-service',
    targetSocket: 'ws://192.168.10.200:8181',
  },
  'build:test': {
    targetApi: 'http://192.168.10.200:8080/api',
    targetUser: 'http://192.168.10.201:8081/user-service',
    targetOrder: 'http://192.168.10.202:8082/order-service',
    targetSocket: 'ws://192.168.10.200:8181',
  },

  // 正式/生产环境 (npm run dev:prd / npm run build:prd)
  'dev:prd': {
    targetApi: 'https://yourdomain.com/api',
    targetUser: 'https://yourdomain.com/user-service',
    targetOrder: 'https://yourdomain.com/order-service',
    targetSocket: 'wss://yourdomain.com/socket',
  },
  'build:prd': {
    targetApi: 'https://yourdomain.com/api',
    targetUser: 'https://yourdomain.com/user-service',
    targetOrder: 'https://yourdomain.com/order-service',
    targetSocket: 'wss://yourdomain.com/socket',
  },
}

// 2. 获取当前运行环境
const currentScript = process.env.npm_lifecycle_event || ''
const currentEnv = environments[currentScript] || environments.default

console.log('--------------------------------------------------')
console.log('当前运行命令:', currentScript || 'dev')
for (const [key, value] of Object.entries(currentEnv)) {
  console.log(`${key.padEnd(12)}: ${value}`)
}
console.log('--------------------------------------------------')

// 3. 根据 currentEnv 自动生成 Vite proxy 开发代理配置
export const proxy = {}

for (const [key, targetUrl] of Object.entries(currentEnv)) {
  // 把 targetUser 转换为 '/user'，targetSocket 转换为 '/socket'
  const moduleName = key.replace(/^target/, '').toLowerCase()
  const pathPrefix = `/${moduleName}`

  proxy[pathPrefix] = {
    target: targetUrl,
    changeOrigin: true,
    rewrite: path => path.replace(new RegExp(`^${pathPrefix}`), ''),
    ...(moduleName === 'socket' ? { ws: true } : {}),
  }
}

// 4. 自动复用 proxy 派生生成 proxyApi 对象
// 产出：{ api: '/api', user: '/user', order: '/order', socket: '/socket' }
export const proxyApi = {}
for (const pathPrefix in proxy) {
  proxyApi[pathPrefix.replace(/^\//, '')] = pathPrefix
}

// 默认导出
export default proxyApi
