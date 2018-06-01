
// 是APP是 gzip 选用 false
let gzip = true
// gzip = false
let host = 'http://www.udao56.com/thinkphp5/index.php/tms'
// ----------- 以下默认
let proxyTable = {
  '/api': {
    target: host,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  },
  // 仅测试可用，因build 后放到服务器环境是没有代理
  '/hot': {
    target: 'http://echarts.baidu.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/hot': '/'
    }
  }
}
let api = '/api'
if (process.env.NODE_ENV === 'development') {
  api = '/api'
} else {
  api = ''
  if (!gzip) api = host
}
module.exports = {
  proxyTable,
  gzip,
  api
}
