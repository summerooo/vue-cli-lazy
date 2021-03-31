let host = ''

let nginx = false
nginx = true

export const proxy = {
  '/api': {
    target: 'https://land.tengshangnetwork.com/api/v1',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, '')
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

export default proxyApi
