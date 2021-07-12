let host = ''

let nginx = false
nginx = true
let nginxSuffix = ''

export const proxy = {
  '/api': {
    target: 'https://land.tengshangnetwork.com/api/v1',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, '')
  },
  // new WebSocket(`ws://${location.host}/socket`)
  '/socket': {
    target: 'ws://192.168.185.130:8181',//后端目标接口地址
    changeOrigin: true,//是否允许跨域
    pathRewrite: {
      '^/socket': '',//重写,
    },
    ws: true //开启ws, 如果是http代理此处可以不用设置
  }
}
// proxy -> {'api': '/api’}
let proxyApi = {}
for (let i in proxy) {
  proxyApi[i.replace(/\//, '')] = i
}
// build
if (process.env.NODE_ENV === 'production') {
  for (let i in proxy) {
    proxyApi[i.replace(/\//, '')] = nginx ? (i + nginxSuffix) : proxy[i].target
  }
}
console.log(proxyApi, process.env.NODE_ENV)

export default proxyApi
