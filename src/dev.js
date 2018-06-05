// 开发环境下无需更改，一切默认就好，生产环境 如果是放到java node 或 php 指定目录的话,
// 并且无代理，所以只能是服务器地址下的ajax，否则会跨域
// 为了解决多个不同访问方法，采用nginx的方式并且nginx 的代理方式 与 cli里代理无异。
let nginx = false
// nginx = true
// 是APP是 gzip 选用 false
let gzip = true
// gzip = false
// ----------- 以下默认
//  nginx 和 gzip
//  gzip 是 因为cordova app 不支持gzip
// ------------
// 服务主要地址
let host = 'http://www.udao56.com/thinkphp5/index.php/tms'
// --------------------------------------------------------------------------------------------------------
let proxyTable = {
  '/api': {
    target: host,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  },
  // 没有代理服务器环境 不可用, 用上nginx代理 可用
  '/hot': {
    target: 'http://echarts.baidu.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/hot': '/'
    }
  }
}
// nginx 相对的配置   我把nginx 文件放到了 static 下  名字 为nginx.conf 具体配置可以看

// location /api {
//   proxy_pass http://www.udao56.com/thinkphp5/index.php/tms;
// }
// location /hot {
//     proxy_pass http://echarts.baidu.com/;
// }

let proxyTableApi = {}
// Is your service nginx  和 npm run dev 都是代理方式
// 封装一个对象，如 {'api': '/api’}
for (let i in proxyTable) {
  proxyTableApi[i.replace(/\//, '')] = i
}
// build 后 无代理 放到指定服务目录下 无代理 所以不能用 /hot...
if (process.env.NODE_ENV === 'production') {
  if (gzip) {
    if (!nginx) {
      for (let i in proxyTable) {
        proxyTableApi[i.replace(/\//, '')] = ''
      }
    }
  } else {
    for (let i in proxyTable) {
      proxyTableApi[i.replace(/\//, '')] = proxyTable[i].target
    }
  }
}
console.log(proxyTableApi)
module.exports = {
  proxyTable,
  proxyTableApi,
  gzip
}
