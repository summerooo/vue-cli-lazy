/* This file is now deprecated; proxy configuration moved to vite.config.js */

// Tencent COS config.
export const cosConfig = {
  bucket: '',
  region: '',
  stsPath: '/cos/sts',
  configured: false,
  message: ''
}

// host/socket: URL used by frontend runtime.
// targetHost/targetSocket: Vite proxy target.
const environments = {
  'build:production': {
    host: '/api',
    socket: '/socket',
    targetHost: 'http://api.hbgxzhny.com/api',
    targetSocket: 'ws://192.168.185.130:8181'
  },
  default: {
    host: '/api',
    socket: '/socket',
    targetHost: 'http://gateway.hbgxzhny.com/api',
    targetSocket: 'ws://192.168.185.130:8181'
  }
}

const currentEnv = environments[process.env.npm_lifecycle_event] || environments.default
const { host, socket, targetHost, targetSocket } = currentEnv

console.log('Current Lifecycle:', process.env.npm_lifecycle_event, 'API Host:', host, 'Proxy Target:', targetHost)

const proxy = {
  '/api': {
    target: targetHost,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, '')
  },
  '/socket': {
    target: targetSocket,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/socket/, ''),
    ws: true
  }
}

const proxyApi = {
  api: host,
  socket: socket
}

// 导出配置
export { proxy, proxyApi as default, host, socket }
