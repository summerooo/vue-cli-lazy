# cc

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## content

具体内容 基于vue-cli 基本需求的通用模板 单页面配置使用 
### gzip
build默认开启
### ajax代理
开发模式和生产模式中dev.js文件
true false判断
### router
对router的文件中路由的懒加载使用
### axios
对axios的封装使用，
对公用接口 和 局部接口的 文件分配，
### vuex
和对 vuex 中内置函数进行 的文件分配使用。
### webpack 中 配置
dist 文件目录调整
map 文件 dev 默认展示, build 默认踢掉。
报错信息 同上
打包过滤注释
svg loader配置等等
### svg引入
加上svg 的引入， 当然是手动引入，手写尴尬。<br>
不知道为什么我的require.context 是 unfinded , 不过是封装了全局组件。<br>
虽然手动辛苦点，但是依然实现了懒加载引入svg。路径可以随便指定 在webpack.base.conf.js 文件中 svgSrc 常量。<br>
icon 在那个页都可以引入 然后传给全局iconSvg, 当然名字是随便起的。svg文件id 默认是svg文件名字。<br>


等等等... 

以及一些基本开发项目所必要模块 。 轻量的脚手架。
