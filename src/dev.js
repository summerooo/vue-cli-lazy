// let host = 'http://api.heliyou.com/userapi/v1/'
let host = 'http://192.168.0.103:85/userapi/v1/'

let nginx = false
nginx = true

let proxy = {
  '/api': {
    target: host,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  }
}
// proxy -> {'api': '/api’}
let proxyApi = {}
for (let i in proxy) {
  proxyApi[i.replace(/\//, '')] = i
}
// build
if (process.env.NODE_ENV === 'production') {
  if (!nginx) {
    for (let i in proxy) {
      proxyApi[i.replace(/\//, '')] = proxy[i].target
    }
  }
}
console.log(proxyApi, process.env.NODE_ENV)
module.exports = {
  proxy,
  ...proxyApi
}
