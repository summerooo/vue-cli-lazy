// 0 dev 1 build 2 App
let what = 0
// what = 1
// what = 2
// axios 的 baseURL
let isDev = true
let isApp = false
let apiUrl = ''
// 代理target
let host = 'http://test.klqzz.top/'

switch (what) {
  case 0:
    apiUrl = '/api'
    break
  case 1:
    apiUrl = host = ''
    break
  case 2:
    apiUrl = host
    isApp = true
    break
}
module.exports = {
  isDev,
  isApp,
  host,
  apiUrl
}
