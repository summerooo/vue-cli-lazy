// nginx 相关配置
const nginx = false
const nginxSuffix = ''

// 环境配置
const environments = {
  'build:prd': {
    host: 'https://api.aipfuture.com',
    socket: 'wss://api.aipfuture.com/api/open/ws'
  },
  'dev:prd': {
    host: 'https://api.aipfuture.com',
    socket: 'wss://api.aipfuture.com/api/open/ws'
  },
  default: {
    host: 'https://api-test.aipfuture.com',
    socket: 'wss://api-test.aipfuture.com/api/open/ws'
  }
}

// 根据当前环境选择 host 和 socket
const { host, socket } = environments[process.env.npm_lifecycle_event] || environments.default

// 代理配置
const proxy = {
  '/api': {
    target: `${host}/api`,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, '') // 移除 '/api' 前缀
  },
  '/socket': {
    target: socket, // WebSocket 目标地址
    changeOrigin: true,
    pathRewrite: {
      '^/socket': '' // 移除 '/socket' 前缀
    },
    ws: true // 启用 WebSocket
  }
}

// 创建 proxyApi，根据环境和 nginx 配置调整目标地址
const proxyApi = Object.fromEntries(
  Object.entries(proxy).map(([key, value]) => [
    key.slice(1),
    nginx
      ? key + nginxSuffix
      : value.target
  ])
)

// 输出调试信息
console.log(proxyApi, process.env.NODE_ENV)

// 导出配置
export { proxy, proxyApi as default }
