
// 开发环境为true，生产环境为false
let isDev = true
// let isDev = false

let apiUrl = ''
let host = 'http://www.udao56.com/thinkphp5/index.php/tms'

if (isDev) apiUrl = '/api'
else apiUrl = host

module.exports = {
  isDev,
  host,
  apiUrl
}
