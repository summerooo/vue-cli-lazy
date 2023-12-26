
let nginx = false
let nginxSuffix = ''
let host = '', socket = ''

switch (process.env.npm_lifecycle_event) {
  case 'build:production':
    host = 'http://api.hbgxzhny.com'
    socket = 'ws://192.168.185.130:8181'
    break
  default:
    host = 'http://gateway.hbgxzhny.com'
    socket = 'ws://192.168.185.130:8181'
    break
}

export const proxy = {
  '/api': {
    target: `${host}/api`,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, '')
  },
  '/socket': {
    target: socket,//后端目标接口地址 new WebSocket(`ws://${location.host}/socket`)
    changeOrigin: true,//是否允许跨域
    pathRewrite: {
      '^/socket': '',//重写,
    },
    ws: true //开启ws, 如果是http代理此处可以不用设置
  }
}
// proxy -> {'api': '/api’}
let proxyApi = {}
for (let i in proxy) proxyApi[i.replace(/\//, '')] = i
// 当处于build时，通过nginx字段为true时不拼接url
if (process.env.NODE_ENV === 'production') for (let i in proxy) proxyApi[i.replace(/\//, '')] = nginx ? (i + nginxSuffix) : proxy[i].target

console.log(proxyApi, process.env.NODE_ENV)
export default proxyApi
