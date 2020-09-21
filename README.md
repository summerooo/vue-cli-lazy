## Project Setup

``` bash
# install dependencies
yarn install

# Compiles and hot-reloads for development
yarn run serve

# Compiles and minifies for production
yarn run build

# Run your tests
yarn run test

# Lints and fixes files
yarn run lint
```
## content

#views目录结构(根据多需求的router 设计)
如单独页面有滚动条，或不需要滚动条,可以用 position 中 relative 和 absolute 来控制
|-- views
    |-- layout.vue (相同布局公共组件,可有多个layout，根据需求而定)
    |-- login.vue
    |-- other (其他文件)
        |-- login.vue
    |-- common (公共文件)
        |-- 404.vue
    |-- mine
        |-- index.vue (中转文件，为当前目录其他文件的公共组件)
        |-- xxx.vue

#components目录结构(结构与views 命名规则相同)
|-- components
    |-- common
        |-- xxx.vue
    |-- login
        |-- xxx.vue
    |-- other
        |-- xxx.vue
    |-- mine
        |-- xxx.vue

#api目录结构(结构与views 命名规则相同)
|-- api
    |-- common
        |-- xxx.js
    |-- login
        |-- xxx.js
#assets目录结构(结构与views 命名规则相同)
|-- assets
    |-- css
        |-- xxx.scss
        |-- xxx.less
        |-- xxx.css
    |-- images
        |-- xxx.png


#router目录结构(变量与views命名规则相同,可利用require.context获取views文件目录自动生成路由，默认静态设置,具体参看router 文件夹)
|-- router
    |-- index.js
    |-- routes.js


#store目录结构
|-- sotre
    |-- index.js


#dev.js
代理配置 根据需求而定，在api中进行引入，打包时会显示ajax是以什么路径打包

#vue.config.js
基本优化  注释去除 console 去除 代码压缩 sourceMap去除 默认scss 等

#app.vue
默认全局样式
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
